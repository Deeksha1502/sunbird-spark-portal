import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FiArrowLeft,
    FiClock,
    FiBookOpen,
    FiUsers,
    FiStar,
    FiPlay,
    FiCheckCircle,
    FiLock,
    FiChevronDown,
    FiChevronUp
} from "react-icons/fi";
import { Button } from "@/components/button";
import { Progress } from "@/components/progress";
import { Badge } from "@/components/badge";
import { Card, CardContent } from "@/components/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/collapsible";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import VideoPlayer from "@/components/VideoPlayer";
import { featuredCourses, popularCourses } from "@/configs/mockData"
import { useAppI18n } from "@/hooks/useAppI18n";

const allCourses = [...featuredCourses, ...popularCourses];

// Mock lesson data - in real app this would come from API
const generateLessons = (courseId: string, totalLessons: number) => {
    const modules = Math.ceil(totalLessons / 8);
    const modulesData = [];

    let lessonIndex = 1;
    for (let m = 1; m <= modules; m++) {
        const lessonsInModule = Math.min(8, totalLessons - (m - 1) * 8);
        const lessons = [];

        for (let l = 1; l <= lessonsInModule; l++) {
            const isCompleted = Math.random() > 0.6; // Random completion for demo
            lessons.push({
                id: `${courseId}-${lessonIndex}`,
                title: `Lesson ${lessonIndex}: ${getLessonTitle(lessonIndex)}`,
                duration: `${Math.floor(Math.random() * 20) + 5} min`,
                isCompleted,
                isLocked: lessonIndex > 3 && !isCompleted && Math.random() > 0.5,
            });
            lessonIndex++;
        }

        modulesData.push({
            id: `module-${m}`,
            title: `Module ${m}: ${getModuleTitle(m)}`,
            lessons,
        });
    }

    return modulesData;
};

const getLessonTitle = (index: number) => {
    const titles = [
        "Introduction & Overview",
        "Getting Started",
        "Core Concepts",
        "Fundamental Principles",
        "Practical Applications",
        "Advanced Techniques",
        "Best Practices",
        "Case Studies",
        "Hands-on Project",
        "Review & Assessment",
        "Deep Dive Analysis",
        "Expert Insights",
    ];
    return titles[(index - 1) % titles.length];
};

const getModuleTitle = (index: number) => {
    const titles = [
        "Foundation & Basics",
        "Core Competencies",
        "Intermediate Skills",
        "Advanced Concepts",
        "Professional Application",
        "Mastery & Certification",
    ];
    return titles[(index - 1) % titles.length];
};

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { currentCode } = useAppI18n();
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

    const openVideoPlayer = (moduleIndex: number, lessonIndex: number) => {
        const module = modules[moduleIndex];
        if (!module) return;
        const lesson = module.lessons[lessonIndex];
        if (lesson && !lesson.isLocked) {
            setCurrentLessonIndex({ moduleIndex, lessonIndex });
            setShowVideoPlayer(true);
        }
    };

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
                        {/* Course Header */}
                        <div>
                            <div className="relative rounded-xl overflow-hidden mb-6">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-64 md:h-80 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <Button
                                    size="lg"
                                    className="absolute bottom-6 left-6 gap-2 bg-primary hover:bg-primary/90"
                                    onClick={handleContinueLearning}
                                >
                                    <FiPlay className="w-5 h-5" />
                                    Continue Learning
                                </Button>
                            </div>

                            <Badge variant="secondary" className="mb-3">
                                {course.category}
                            </Badge>
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                                {course.title}
                            </h1>
                            <p className="text-muted-foreground mb-4">
                                Instructor: <span className="text-foreground">{course.instructor}</span>
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-foreground font-medium">{course.rating}</span>
                                    <span>({course.reviewCount.toLocaleString()} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiUsers className="w-4 h-4" />
                                    {course.enrolledCount.toLocaleString()} enrolled
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiClock className="w-4 h-4" />
                                    {course.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                    <FiBookOpen className="w-4 h-4" />
                                    {course.lessons} lessons
                                </div>
                            </div>
                        </div>

                        {/* Course Content */}
                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                Course Content
                            </h2>
                            <div className="space-y-3">
                                {modules.map((module, moduleIndex) => (
                                    <Collapsible
                                        key={module.id}
                                        open={expandedModules.includes(module.id)}
                                        onOpenChange={() => toggleModule(module.id)}
                                    >
                                        <Card className="border-border">
                                            <CollapsibleTrigger asChild>
                                                <CardContent className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                                <FiBookOpen className="w-4 h-4 text-primary" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-medium text-foreground">
                                                                    {module.title}
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {module.lessons.length} lessons •
                                                                    {module.lessons.filter(l => lessonProgress[l.id]).length} completed
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {expandedModules.includes(module.id) ? (
                                                            <FiChevronUp className="w-5 h-5 text-muted-foreground" />
                                                        ) : (
                                                            <FiChevronDown className="w-5 h-5 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <div className="border-t border-border">
                                                    {module.lessons.map((lesson, lessonIndex) => {
                                                        const isCompleted = lessonProgress[lesson.id] ?? lesson.isCompleted;
                                                        return (
                                                            <div
                                                                key={lesson.id}
                                                                onClick={() => !lesson.isLocked && navigate(`/course/${courseId}/lesson/${lesson.id}`)}
                                                                className={`flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 transition-colors ${lesson.isLocked
                                                                    ? "opacity-50 cursor-not-allowed"
                                                                    : "hover:bg-primary/10 cursor-pointer"
                                                                    }`}
                                                            >
                                                                <div className="w-6 h-6 flex items-center justify-center">
                                                                    {isCompleted ? (
                                                                        <FiCheckCircle className="w-5 h-5 text-green-500" />
                                                                    ) : lesson.isLocked ? (
                                                                        <FiLock className="w-4 h-4 text-muted-foreground" />
                                                                    ) : (
                                                                        <FiPlay className="w-4 h-4 text-primary" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className={`text-sm ${isCompleted ? "text-muted-foreground" : "text-foreground"}`}>
                                                                        {lesson.title}
                                                                    </p>
                                                                </div>
                                                                <span className="text-xs text-muted-foreground">
                                                                    {lesson.duration}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </CollapsibleContent>
                                        </Card>
                                    </Collapsible>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Progress Card */}
                        <Card className="border-border sticky top-24">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-foreground mb-4">
                                    Your Progress
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-muted-foreground">Overall Progress</span>
                                            <span className="font-medium text-foreground">{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="h-3" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-primary">{completedLessons}</p>
                                            <p className="text-sm text-muted-foreground">Completed</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-foreground">{course.lessons - completedLessons}</p>
                                            <p className="text-sm text-muted-foreground">Remaining</p>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-primary hover:bg-primary/90 gap-2"
                                        onClick={handleContinueLearning}
                                    >
                                        <FiPlay className="w-4 h-4" />
                                        Continue Learning
                                    </Button>

                                    <div className="text-center pt-2">
                                        <p className="text-xs text-muted-foreground">
                                            Last accessed 2 days ago
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Info */}
                        <Card className="border-border">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="font-semibold text-foreground">Course Details</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Level</span>
                                        <span className="text-foreground">{course.level}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="text-foreground">{course.duration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Lessons</span>
                                        <span className="text-foreground">{course.lessons}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Category</span>
                                        <span className="text-foreground">{course.category}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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
