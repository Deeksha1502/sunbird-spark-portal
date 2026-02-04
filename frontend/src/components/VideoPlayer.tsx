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
import { Lesson } from "@/types";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";

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
    const {
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
    } = useVideoPlayer({
        currentLesson,
        onLessonComplete,
        onNextLesson,
        onClose,
        autoAdvance,
        hasNextLesson
    });

    // Demo video URL (using a sample video)
    const demoVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

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
