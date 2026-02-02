import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FiArrowLeft,
    FiShare2,
    FiPlay,
    FiPause,
    FiChevronDown,
    FiChevronUp,
    FiVideo,
    FiFileText,
    FiLayers,
    FiMenu,
} from "react-icons/fi";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/collapsible";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { featuredCourses, popularCourses } from "@/configs/mockData";

const allCourses = [...featuredCourses, ...popularCourses];

// Generate lessons for a course
const generateLessons = (courseId: string, totalLessons: number) => {
    const modules = Math.ceil(totalLessons / 8);
    const modulesData = [];

    let lessonIndex = 1;
    for (let m = 1; m <= modules; m++) {
        const lessonsInModule = Math.min(8, totalLessons - (m - 1) * 8);
        const lessons = [];

        for (let l = 1; l <= lessonsInModule; l++) {
            const contentTypes = ["video", "interactive", "doc"];
            const contentType = contentTypes[Math.floor(Math.random() * 3)] as "video" | "interactive" | "doc";
            lessons.push({
                id: `${courseId}-${lessonIndex}`,
                title: `Content-${lessonIndex}00MB-Mp4`,
                duration: `${Math.floor(Math.random() * 20) + 5} min`,
                contentType,
            });
            lessonIndex++;
        }

        modulesData.push({
            id: `module-${m}`,
            title: `Textbook Unit${m}`,
            lessons,
        });
    }

    return modulesData;
};

type ContentFilter = "all" | "video" | "interactive" | "doc";

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

    const getContentIcon = (type: "video" | "interactive" | "doc") => {
        switch (type) {
            case "video":
                return <FiVideo className="w-4 h-4" />;
            case "interactive":
                return <FiLayers className="w-4 h-4" />;
            case "doc":
                return <FiFileText className="w-4 h-4" />;
        }
    };

    const filterLessons = (lessons: typeof modules[0]["lessons"]) => {
        if (contentFilter === "all") return lessons;
        return lessons.filter((l) => l.contentType === contentFilter);
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
                        <div className="lg:col-span-2 space-y-4">
                            {/* Video Player Area */}
                            <div className="relative rounded-xl overflow-hidden bg-muted aspect-video">
                                {/* Menu button */}
                                <button className="absolute top-4 left-4 z-10 p-2 bg-white/80 rounded-lg hover:bg-white transition-colors">
                                    <FiMenu className="w-5 h-5 text-foreground" />
                                </button>

                                <video
                                    ref={videoRef}
                                    src={demoVideoUrl}
                                    className="w-full h-full object-cover"
                                    onClick={handlePlayPause}
                                />

                                {/* Play Button Overlay */}
                                {!isPlaying && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                        onClick={handlePlayPause}
                                    >
                                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                                            <FiPlay className="w-10 h-10 text-foreground ml-1" />
                                        </div>
                                    </div>
                                )}

                                {/* Pause overlay when playing */}
                                {isPlaying && (
                                    <div
                                        className="absolute inset-0 cursor-pointer"
                                        onClick={handlePlayPause}
                                    />
                                )}
                            </div>

                            {/* Content Title and Share */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-primary">
                                        {currentLesson?.title || "Content-100MB-Mp4"}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        by {course.instructor.split(" ")[0]}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1 text-muted-foreground"
                                >
                                    <FiShare2 className="w-4 h-4" />
                                    Share
                                </Button>
                            </div>

                            {/* About the Content Accordion */}
                            <Collapsible open={showAboutContent} onOpenChange={setShowAboutContent}>
                                <Card className="border-border bg-muted/50">
                                    <CollapsibleTrigger asChild>
                                        <CardContent className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/70 transition-colors">
                                            <span className="font-medium text-foreground">
                                                About the content
                                            </span>
                                            {showAboutContent ? (
                                                <FiChevronUp className="w-5 h-5 text-muted-foreground" />
                                            ) : (
                                                <FiChevronDown className="w-5 h-5 text-muted-foreground" />
                                            )}
                                        </CardContent>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="px-4 pb-4 text-sm text-muted-foreground">
                                            <p>
                                                This lesson covers the fundamentals of the topic with
                                                practical examples and hands-on exercises. Duration:{" "}
                                                {currentLesson?.duration}
                                            </p>
                                        </div>
                                    </CollapsibleContent>
                                </Card>
                            </Collapsible>

                            {/* The collection is relevant for Accordion */}
                            <Collapsible open={showRelevantFor} onOpenChange={setShowRelevantFor}>
                                <Card className="border-border bg-muted/50">
                                    <CollapsibleTrigger asChild>
                                        <CardContent className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/70 transition-colors">
                                            <span className="font-medium text-foreground">
                                                The collection is relevant for
                                            </span>
                                            {showRelevantFor ? (
                                                <FiChevronUp className="w-5 h-5 text-muted-foreground" />
                                            ) : (
                                                <FiChevronDown className="w-5 h-5 text-muted-foreground" />
                                            )}
                                        </CardContent>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="px-4 pb-4 text-sm text-muted-foreground">
                                            <p>
                                                Students, professionals, and anyone looking to enhance
                                                their skills in {course.category}.
                                            </p>
                                        </div>
                                    </CollapsibleContent>
                                </Card>
                            </Collapsible>
                        </div>

                        {/* Right Column - Content List */}
                        <div className="space-y-4">
                            {/* Content Type Filters */}
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant={contentFilter === "all" ? "default" : "outline"}
                                    size="sm"
                                    className={
                                        contentFilter === "all"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-white border-border"
                                    }
                                    onClick={() => setContentFilter("all")}
                                >
                                    All
                                </Button>
                                <Button
                                    variant={contentFilter === "video" ? "default" : "outline"}
                                    size="sm"
                                    className={
                                        contentFilter === "video"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-white border-border"
                                    }
                                    onClick={() => setContentFilter("video")}
                                >
                                    <FiVideo className="w-4 h-4 mr-1" />
                                    Video
                                </Button>
                                <Button
                                    variant={contentFilter === "interactive" ? "default" : "outline"}
                                    size="sm"
                                    className={
                                        contentFilter === "interactive"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-white border-border"
                                    }
                                    onClick={() => setContentFilter("interactive")}
                                >
                                    <FiLayers className="w-4 h-4 mr-1" />
                                    Interactive
                                </Button>
                                <Button
                                    variant={contentFilter === "doc" ? "default" : "outline"}
                                    size="sm"
                                    className={
                                        contentFilter === "doc"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-white border-border"
                                    }
                                    onClick={() => setContentFilter("doc")}
                                >
                                    <FiFileText className="w-4 h-4 mr-1" />
                                    Docs
                                </Button>
                            </div>

                            {/* Units/Modules List */}
                            <div className="space-y-3">
                                {modules.map((module) => {
                                    const filteredLessons = filterLessons(module.lessons);
                                    if (filteredLessons.length === 0 && contentFilter !== "all")
                                        return null;

                                    return (
                                        <Collapsible
                                            key={module.id}
                                            open={expandedSections.includes(module.id)}
                                            onOpenChange={() => toggleSection(module.id)}
                                        >
                                            <Card className="border-border bg-card">
                                                <CollapsibleTrigger asChild>
                                                    <CardContent className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium text-primary">
                                                                {module.title}
                                                            </span>
                                                            {expandedSections.includes(module.id) ? (
                                                                <FiChevronUp className="w-5 h-5 text-muted-foreground" />
                                                            ) : (
                                                                <FiChevronDown className="w-5 h-5 text-muted-foreground" />
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <div className="px-4 pb-4 space-y-2">
                                                        {filteredLessons.map((lesson) => (
                                                            <div
                                                                key={lesson.id}
                                                                onClick={() => handleLessonClick(lesson)}
                                                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${lesson.id === lessonId
                                                                    ? "bg-primary/10 border border-primary/30"
                                                                    : "hover:bg-muted/50"
                                                                    }`}
                                                            >
                                                                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-primary">
                                                                    {getContentIcon(lesson.contentType)}
                                                                </div>
                                                                <span
                                                                    className={`text-sm ${lesson.id === lessonId
                                                                        ? "text-primary font-medium"
                                                                        : "text-primary"
                                                                        }`}
                                                                >
                                                                    {lesson.title}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CollapsibleContent>
                                            </Card>
                                        </Collapsible>
                                    );
                                })}
                            </div>

                            {/* Credits and Licence Information */}
                            <Collapsible open={showCredits} onOpenChange={setShowCredits}>
                                <Card className="border-border bg-card">
                                    <CollapsibleTrigger asChild>
                                        <CardContent className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-foreground">
                                                    Credits and Licence information
                                                </span>
                                                {showCredits ? (
                                                    <FiChevronUp className="w-5 h-5 text-muted-foreground" />
                                                ) : (
                                                    <FiChevronDown className="w-5 h-5 text-muted-foreground" />
                                                )}
                                            </div>
                                        </CardContent>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="px-4 pb-4 text-sm text-muted-foreground">
                                            <p className="mb-2">
                                                <strong>Author:</strong> {course.instructor}
                                            </p>
                                            <p className="mb-2">
                                                <strong>License:</strong> Creative Commons (CC-BY 4.0)
                                            </p>
                                            <p>
                                                <strong>Published:</strong> SUNBIRD
                                            </p>
                                        </div>
                                    </CollapsibleContent>
                                </Card>
                            </Collapsible>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LessonPlayer;
