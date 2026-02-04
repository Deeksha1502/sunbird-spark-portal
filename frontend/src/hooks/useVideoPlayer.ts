import { useState, useRef, useEffect, useCallback } from "react";
import { Lesson } from "@/types";

interface UseVideoPlayerProps {
    currentLesson: Lesson;
    onLessonComplete: (lessonId: string) => void;
    onNextLesson: () => void;
    onClose: () => void;
    autoAdvance?: boolean;
    hasNextLesson: boolean;
}

export const useVideoPlayer = ({
    currentLesson,
    onLessonComplete,
    onNextLesson,
    onClose,
    autoAdvance = true,
    hasNextLesson,
}: UseVideoPlayerProps) => {
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

    const cancelAutoAdvance = () => {
        setShowAutoAdvance(false);
        setAutoAdvanceCountdown(5);
    };

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
    }, [handlePlayPause, onClose, toggleMute, handleFullscreen]);

    return {
        videoRef,
        containerRef,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        showControls,
        progress,
        showAutoAdvance,
        autoAdvanceCountdown,
        formatTime,
        handlePlayPause,
        handleTimeUpdate,
        handleLoadedMetadata,
        handleSeek,
        handleVolumeChange,
        toggleMute,
        handleFullscreen,
        handleVideoEnded,
        handleMouseMove,
        cancelAutoAdvance,
        setShowAutoAdvance,
    };
};
