import { useState, useRef, useEffect, useCallback } from "react";
import {
    FiPlay,
    FiPause,
    FiVolume2,
    FiVolumeX,
    FiMaximize,
    FiSkipForward,
    FiSkipBack,
    FiX
} from "react-icons/fi";
import { Button } from "@/components/button";
import { Slider } from "@/components/slider";
import { cn } from "@/lib/utils";

interface Lesson {
    id: string;
    title: string;
    duration: string;
    isCompleted: boolean;
    isLocked: boolean;
    videoUrl?: string;
}

interface VideoPlayerProps {
    currentLesson: Lesson;
    onLessonComplete: (lessonId: string) => void;
    onNextLesson: () => void;
    onPreviousLesson: () => void;
    hasNextLesson: boolean;
    hasPreviousLesson: boolean;
    onClose: () => void;
    autoAdvance?: boolean;
}

const VideoPlayer = ({
    currentLesson,
    onLessonComplete,
    onNextLesson,
    onPreviousLesson,
    hasNextLesson,
    hasPreviousLesson,
    onClose,
    autoAdvance = true,
}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showAutoAdvance, setShowAutoAdvance] = useState(false);
    const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState(5);
    const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Demo video URL (using a sample video)
    const demoVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

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

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setCurrentTime(current);
            setProgress((current / total) * 100);

            // Mark as completed when 90% watched
            if (current / total >= 0.9 && !currentLesson.isCompleted) {
                onLessonComplete(currentLesson.id);
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (value: number[]) => {
        if (videoRef.current) {
            const val = value[0] ?? 0;
            const seekTime = (val / 100) * duration;
            videoRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
            setProgress(val);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        if (videoRef.current) {
            const val = value[0] ?? 0;
            const newVolume = val / 100;
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            if (isMuted) {
                videoRef.current.volume = volume || 0.5;
                setIsMuted(false);
            } else {
                videoRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    const handleFullscreen = () => {
        if (containerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                containerRef.current.requestFullscreen();
            }
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
        if (autoAdvance && hasNextLesson) {
            setShowAutoAdvance(true);
            setAutoAdvanceCountdown(5);
        }
    };

    // Auto-advance countdown
    useEffect(() => {
        let countdownInterval: ReturnType<typeof setInterval>;
        if (showAutoAdvance && autoAdvanceCountdown > 0) {
            countdownInterval = setInterval(() => {
                setAutoAdvanceCountdown((prev) => prev - 1);
            }, 1000);
        } else if (showAutoAdvance && autoAdvanceCountdown === 0) {
            setShowAutoAdvance(false);
            onNextLesson();
        }
        return () => clearInterval(countdownInterval);
    }, [showAutoAdvance, autoAdvanceCountdown, onNextLesson]);

    // Cancel auto-advance
    const cancelAutoAdvance = () => {
        setShowAutoAdvance(false);
        setAutoAdvanceCountdown(5);
    };

    // Hide controls after inactivity
    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case " ":
                case "k":
                    e.preventDefault();
                    handlePlayPause();
                    break;
                case "ArrowLeft":
                    if (videoRef.current) {
                        videoRef.current.currentTime -= 10;
                    }
                    break;
                case "ArrowRight":
                    if (videoRef.current) {
                        videoRef.current.currentTime += 10;
                    }
                    break;
                case "m":
                    toggleMute();
                    break;
                case "f":
                    handleFullscreen();
                    break;
                case "Escape":
                    onClose();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePlayPause, onClose]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 bg-black flex flex-col"
            onMouseMove={handleMouseMove}
        >
            {/* Header */}
            <div
                className={cn(
                    "absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300",
                    showControls ? "opacity-100" : "opacity-0"
                )}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-white font-semibold text-lg">{currentLesson.title}</h2>
                        <p className="text-white/70 text-sm">Duration: {currentLesson.duration}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={onClose}
                    >
                        <FiX className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            {/* Video */}
            <div className="flex-1 flex items-center justify-center">
                <video
                    ref={videoRef}
                    src={currentLesson.videoUrl || demoVideoUrl}
                    className="max-h-full max-w-full"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleVideoEnded}
                    onClick={handlePlayPause}
                />

                {/* Play/Pause overlay */}
                {!isPlaying && !showAutoAdvance && (
                    <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={handlePlayPause}
                    >
                        <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors">
                            <FiPlay className="w-10 h-10 text-white ml-1" />
                        </div>
                    </div>
                )}

                {/* Auto-advance overlay */}
                {showAutoAdvance && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <div className="text-center space-y-4">
                            <p className="text-white text-lg">Up next in {autoAdvanceCountdown} seconds...</p>
                            <div className="flex gap-4 justify-center">
                                <Button
                                    variant="outline"
                                    className="border-white/30 text-white hover:bg-white/20"
                                    onClick={cancelAutoAdvance}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={() => {
                                        setShowAutoAdvance(false);
                                        onNextLesson();
                                    }}
                                >
                                    Play Now
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300",
                    showControls ? "opacity-100" : "opacity-0"
                )}
            >
                {/* Progress bar */}
                <div className="mb-4">
                    <Slider
                        value={[progress]}
                        onValueChange={handleSeek}
                        max={100}
                        step={0.1}
                        className="cursor-pointer"
                    />
                </div>

                <div className="flex items-center justify-between">
                    {/* Left controls */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={onPreviousLesson}
                            disabled={!hasPreviousLesson}
                        >
                            <FiSkipBack className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 w-12 h-12"
                            onClick={handlePlayPause}
                        >
                            {isPlaying ? (
                                <FiPause className="w-6 h-6" />
                            ) : (
                                <FiPlay className="w-6 h-6 ml-0.5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={onNextLesson}
                            disabled={!hasNextLesson}
                        >
                            <FiSkipForward className="w-5 h-5" />
                        </Button>

                        {/* Volume */}
                        <div className="flex items-center gap-2 ml-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20"
                                onClick={toggleMute}
                            >
                                {isMuted ? (
                                    <FiVolumeX className="w-5 h-5" />
                                ) : (
                                    <FiVolume2 className="w-5 h-5" />
                                )}
                            </Button>
                            <div className="w-24 hidden sm:block">
                                <Slider
                                    value={[isMuted ? 0 : volume * 100]}
                                    onValueChange={handleVolumeChange}
                                    max={100}
                                    step={1}
                                />
                            </div>
                        </div>

                        {/* Time */}
                        <span className="text-white text-sm ml-4">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={handleFullscreen}
                        >
                            <FiMaximize className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Lesson completion indicator */}
            {currentLesson.isCompleted && (
                <div className="absolute top-20 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    ✓ Completed
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
