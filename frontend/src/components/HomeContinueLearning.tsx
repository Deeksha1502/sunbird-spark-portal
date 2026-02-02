import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/button";

const continueCourse = {
    id: "1",
    title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    progress: 30,
};

// Circular progress component
const CircularProgress = ({ progress }: { progress: number }) => {
    const size = 24;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle (non-completed) */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#F0CE94"
                strokeWidth={strokeWidth}
            />
            {/* Progress circle (completed) */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#A85236"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
            />
        </svg>
    );
};

const HomeContinueLearning = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Continue from where you left
            </h3>

            <div className="flex gap-5">
                {/* Thumbnail */}
                <div className="w-36 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                        src={continueCourse.thumbnail}
                        alt={continueCourse.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {continueCourse.title}
                        </h4>

                        {/* Progress */}
                        <div className="flex items-center gap-2">
                            <CircularProgress progress={continueCourse.progress} />
                            <span className="text-sm text-gray-500">
                                Completed : {continueCourse.progress}%
                            </span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                        onClick={() => navigate(`/course/${continueCourse.id}`)}
                        className="w-fit mt-3 bg-[#A85236] hover:bg-[#8a4329] text-white rounded-full px-6 h-10"
                    >
                        Continue Learning
                        <FiArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomeContinueLearning;
