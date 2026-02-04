import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "@/components/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import VideoPlayer from "@/components/VideoPlayer";
import { featuredCourses, popularCourses } from "@/configs/mockData"
import { generateLessons } from "@/utils/courseUtils";
import CourseHeader from "@/components/course/CourseHeader";
import CourseContent from "@/components/course/CourseContent";
import CourseSidebar from "@/components/course/CourseSidebar";

const allCourses = [...featuredCourses, ...popularCourses];

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [expandedModules, setExpandedModules] = useState<string[]>(["module-1"]);
    const [isLoading, setIsLoading] = useState(true);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [currentLessonIndex, setCurrentLessonIndex] = useState<{ moduleIndex: number; lessonIndex: number } | null>(null);
    const [lessonProgress, setLessonProgress] = useState<Record<string, boolean>>({});

    const course = allCourses.find(c => c.id === courseId);

    // Generate lessons once and memoize
    const modules = useMemo(() => {
        if (!course) return [];
        return generateLessons(course.id, course.lessons);
    }, [course]);

    // Initialize lesson progress from generated data
    useEffect(() => {
        if (modules.length > 0) {
            const initialProgress: Record<string, boolean> = {};
            modules.forEach(module => {
                module.lessons.forEach(lesson => {
                    initialProgress[lesson.id] = lesson.isCompleted;
                });
            });
            setLessonProgress(initialProgress);
        }
    }, [modules]);

    // Get all lessons flattened for navigation
    const allLessons = useMemo(() => {
        return modules.flatMap((module, moduleIndex) =>
            module.lessons.map((lesson, lessonIndex) => ({
                ...lesson,
                moduleIndex,
                lessonIndex,
                isCompleted: lessonProgress[lesson.id] ?? lesson.isCompleted,
            }))
        );
    }, [modules, lessonProgress]);

    // Current lesson being played
    const currentLesson = useMemo(() => {
        if (!currentLessonIndex) return null;
        const module = modules[currentLessonIndex.moduleIndex];
        if (!module || !module.lessons) return null;
        const lesson = module.lessons[currentLessonIndex.lessonIndex];
        if (!lesson) return null;
        return {
            ...lesson,
            isCompleted: lessonProgress[lesson.id] ?? lesson.isCompleted,
        };
    }, [currentLessonIndex, modules, lessonProgress]);

    // Flat index of current lesson
    const currentFlatIndex = useMemo(() => {
        if (!currentLessonIndex) return -1;
        let index = 0;
        for (let m = 0; m < currentLessonIndex.moduleIndex; m++) {
            const module = modules[m];
            if (module) {
                index += module.lessons.length;
            }
        }
        return index + currentLessonIndex.lessonIndex;
    }, [currentLessonIndex, modules]);

    const handleLessonComplete = useCallback((lessonId: string) => {
        setLessonProgress(prev => ({ ...prev, [lessonId]: true }));
    }, []);

    const handleNextLesson = useCallback(() => {
        if (currentFlatIndex < allLessons.length - 1) {
            const nextLesson = allLessons[currentFlatIndex + 1];
            if (nextLesson && !nextLesson.isLocked) {
                setCurrentLessonIndex({
                    moduleIndex: nextLesson.moduleIndex,
                    lessonIndex: nextLesson.lessonIndex
                });
            }
        }
    }, [currentFlatIndex, allLessons]);

    const handlePreviousLesson = useCallback(() => {
        if (currentFlatIndex > 0) {
            const prevLesson = allLessons[currentFlatIndex - 1];
            if (prevLesson) {
                setCurrentLessonIndex({
                    moduleIndex: prevLesson.moduleIndex,
                    lessonIndex: prevLesson.lessonIndex
                });
            }
        }
    }, [currentFlatIndex, allLessons]);

    const closeVideoPlayer = () => {
        setShowVideoPlayer(false);
        setCurrentLessonIndex(null);
    };

    // Simulate loading
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [courseId]);

    if (isLoading) {
        return <PageLoader message="Loading course..." />;
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
                    <Button onClick={() => navigate("/explore")}>
                        Back to Courses
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    const completedLessons = Object.values(lessonProgress).filter(Boolean).length;
    const progress = course.lessons > 0 ? Math.round((completedLessons / course.lessons) * 100) : 0;

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    // Find the next incomplete lesson for "Continue Learning"
    const findNextLesson = () => {
        for (let m = 0; m < modules.length; m++) {
            const module = modules[m];
            if (!module) continue;
            for (let l = 0; l < module.lessons.length; l++) {
                const lesson = module.lessons[l];
                if (lesson && !lessonProgress[lesson.id] && !lesson.isLocked) {
                    return { moduleIndex: m, lessonIndex: l };
                }
            }
        }
        return { moduleIndex: 0, lessonIndex: 0 };
    };

    const handleContinueLearning = () => {
        const next = findNextLesson();
        const lesson = modules[next.moduleIndex]?.lessons[next.lessonIndex];
        if (lesson) {
            navigate(`/course/${courseId}/lesson/${lesson.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-6 gap-2"
                    onClick={() => navigate("/explore")}
                >
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Courses
                </Button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <CourseHeader course={course} handleContinueLearning={handleContinueLearning} />

                        <CourseContent
                            modules={modules}
                            expandedModules={expandedModules}
                            toggleModule={toggleModule}
                            lessonProgress={lessonProgress}
                            courseId={courseId}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <CourseSidebar
                            course={course}
                            progress={progress}
                            completedLessons={completedLessons}
                            handleContinueLearning={handleContinueLearning}
                        />
                    </div>
                </div>
            </main>

            <Footer />

            {/* Video Player Modal */}
            {showVideoPlayer && currentLesson && (
                <VideoPlayer
                    currentLesson={currentLesson}
                    onLessonComplete={handleLessonComplete}
                    onNextLesson={handleNextLesson}
                    onPreviousLesson={handlePreviousLesson}
                    hasNextLesson={currentFlatIndex < allLessons.length - 1 && !allLessons[currentFlatIndex + 1]?.isLocked}
                    hasPreviousLesson={currentFlatIndex > 0}
                    onClose={closeVideoPlayer}
                    autoAdvance={true}
                />
            )}
        </div>
    );
};

export default CourseDetail;
