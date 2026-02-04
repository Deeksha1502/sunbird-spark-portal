import React from "react";
import {
    FiMenu,
    FiPlay,
    FiShare2,
    FiChevronUp,
    FiChevronDown,
} from "react-icons/fi";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/collapsible";
import { Lesson } from "@/utils/lessonUtils";

interface LessonVideoPlayerProps {
    course: any;
    currentLesson: Lesson | null;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isPlaying: boolean;
    handlePlayPause: () => void;
    showAboutContent: boolean;
    setShowAboutContent: (open: boolean) => void;
    showRelevantFor: boolean;
    setShowRelevantFor: (open: boolean) => void;
    demoVideoUrl: string;
}

const LessonVideoPlayer = ({
    course,
    currentLesson,
    videoRef,
    isPlaying,
    handlePlayPause,
    showAboutContent,
    setShowAboutContent,
    showRelevantFor,
    setShowRelevantFor,
    demoVideoUrl
}: LessonVideoPlayerProps) => {
    return (
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
    );
};

export default LessonVideoPlayer;
