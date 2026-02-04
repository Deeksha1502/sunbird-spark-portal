import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShare2 } from "react-icons/fi";
import { Button } from "@/components/button";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { featuredCourses, popularCourses } from "@/configs/mockData";
import { generateLessons, ContentFilter } from "@/utils/lessonUtils";
import LessonVideoPlayer from "@/components/lesson-player/LessonVideoPlayer";
import LessonContentList from "@/components/lesson-player/LessonContentList";

const allCourses = [...featuredCourses, ...popularCourses];

const LessonPlayer = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [expandedSections, setExpandedSections] = useState<string[]>(["module-1"]);
    const [contentFilter, setContentFilter] = useState<ContentFilter>("all");
    const [showAboutContent, setShowAboutContent] = useState(false);
    const [showRelevantFor, setShowRelevantFor] = useState(false);
    const [showCredits, setShowCredits] = useState(false);

    const course = allCourses.find((c) => c.id === courseId);

    const modules = useMemo(() => {
        if (!course) return [];
        return generateLessons(course.id, course.lessons);
    }, [course]);

    // Find current lesson
    const currentLesson = useMemo(() => {
        for (const module of modules) {
            const lesson = module.lessons.find((l) => l.id === lessonId);
            if (lesson) return lesson;
        }
        return modules[0]?.lessons[0] || null;
    }, [modules, lessonId]);

    // Demo video URL
    const demoVideoUrl =
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    const handlePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleLessonClick = (lesson: { id: string }) => {
        navigate(`/course/${courseId}/lesson/${lesson.id}`);
    };

    // Simulate loading
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [courseId, lessonId]);

    if (isLoading) {
        return <PageLoader message="Loading lesson..." />;
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">
                        Course Not Found
                    </h1>
                    <Button onClick={() => navigate("/explore")}>Back to Courses</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Yellow Header Bar */}
            <div className="bg-secondary sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-10 h-10"
                            onClick={() => navigate(`/course/${courseId}`)}
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-lg font-semibold text-secondary-foreground">
                            {course.title.length > 40
                                ? course.title.substring(0, 40) + "..."
                                : course.title}
                        </h1>
                    </div>
                    <Button
                        variant="outline"
                        className="gap-2 bg-white border-border text-foreground hover:bg-muted"
                    >
                        <FiShare2 className="w-4 h-4" />
                        Share
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1">
                <div className="container mx-auto px-4 py-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Video Player and Info */}
                        <LessonVideoPlayer
                            course={course}
                            currentLesson={currentLesson}
                            videoRef={videoRef}
                            isPlaying={isPlaying}
                            handlePlayPause={handlePlayPause}
                            showAboutContent={showAboutContent}
                            setShowAboutContent={setShowAboutContent}
                            showRelevantFor={showRelevantFor}
                            setShowRelevantFor={setShowRelevantFor}
                            demoVideoUrl={demoVideoUrl}
                        />

                        {/* Right Column - Content List */}
                        <div className="lg:col-span-1">
                            <LessonContentList
                                contentFilter={contentFilter}
                                setContentFilter={setContentFilter}
                                modules={modules}
                                expandedSections={expandedSections}
                                toggleSection={toggleSection}
                                lessonId={lessonId}
                                handleLessonClick={handleLessonClick}
                                showCredits={showCredits}
                                setShowCredits={setShowCredits}
                                course={course}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LessonPlayer;
