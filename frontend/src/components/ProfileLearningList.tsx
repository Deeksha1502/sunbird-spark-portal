import { useState } from "react";
import { Link } from "react-router-dom";
import { FiDownload, FiEye } from "react-icons/fi";

type FilterType = "all" | "ongoing" | "completed";

interface CourseItem {
    id: string;
    title: string;
    dueDate: string;
    progress: number;
    status: "ongoing" | "completed";
    thumbnail: string;
}

const coursesData: CourseItem[] = [
    {
        id: "1",
        title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
        dueDate: "20th Feb",
        progress: 30,
        status: "ongoing",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop",
    },
    {
        id: "2",
        title: "Data Engineering Foundations",
        dueDate: "10th Feb",
        progress: 50,
        status: "ongoing",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop",
    },
    {
        id: "3",
        title: "Business Decisions and Analytics",
        dueDate: "31st Jan",
        progress: 100,
        status: "completed",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
    },
    {
        id: "4",
        title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
        dueDate: "20th Feb",
        progress: 30,
        status: "ongoing",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop",
    },
    {
        id: "5",
        title: "Data Engineering Foundations",
        dueDate: "10th Feb",
        progress: 50,
        status: "ongoing",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop",
    },
    {
        id: "6",
        title: "Business Decisions and Analytics",
        dueDate: "31st Jan",
        progress: 100,
        status: "completed",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
    },
];

// Progress Ring Component
const ProgressRing = ({ progress }: { progress: number }) => {
    const radius = 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg width="26" height="26" viewBox="0 0 26 26" className="transform -rotate-90">
            {/* Background circle */}
            <circle
                cx="13"
                cy="13"
                r={radius}
                fill="none"
                stroke="#F0CE94"
                strokeWidth="3"
            />
            {/* Progress circle */}
            <circle
                cx="13"
                cy="13"
                r={radius}
                fill="none"
                stroke="#A85236"
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
            />
        </svg>
    );
};

const ProfileLearningList = () => {
    const [filter, setFilter] = useState<FilterType>("all");

    const filteredCourses = coursesData.filter((course) => {
        if (filter === "all") return true;
        return course.status === filter;
    });

    return (
        <div className="bg-white rounded-[20px] p-6">
            {/* Header with Filter */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-[5px] h-[20px] bg-[#CC8545] rounded-sm" />
                    <h2 className="text-[24px] font-medium text-[#222222] font-['Rubik']">
                        My Learning
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[16px] font-medium text-[#222222] font-['Rubik']">Filter :</span>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as FilterType)}
                        className="text-[16px] text-[#222222] font-['Rubik'] border-none bg-transparent focus:outline-none cursor-pointer"
                    >
                        <option value="all">All</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Course List */}
            <div className="space-y-4">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="flex items-center gap-5 p-5 bg-white border border-[#D7D7D7] rounded-[20px]"
                    >
                        {/* Thumbnail */}
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-[70px] h-[70px] rounded-[10px] object-cover flex-shrink-0"
                        />

                        {/* Title and Due Date */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[18px] font-medium text-[#222222] font-['Rubik'] line-clamp-2 mb-1">
                                {course.title}
                            </h4>
                            <p className="text-[14px] text-[#757575] font-['Rubik']">
                                Due Date : {course.dueDate}
                            </p>
                        </div>

                        {/* Progress Ring + Percentage */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <ProgressRing progress={course.progress} />
                            <span className="text-[16px] text-[#222222] font-['Rubik']">
                                {course.progress}%
                            </span>
                        </div>

                        {/* Status Badge */}
                        <div
                            className={`px-4 py-1.5 rounded-full flex-shrink-0 ${course.status === "completed"
                                    ? "bg-[#CAE5B6] border border-[#82A668]"
                                    : "bg-[#FFF1C7] border border-[#CC8545]"
                                }`}
                        >
                            <span className="text-[14px] font-medium text-black font-['Rubik'] capitalize">
                                {course.status === "completed" ? "Completed" : "Ongoing"}
                            </span>
                        </div>

                        {/* Certificate Action */}
                        <button
                            className={`flex items-center gap-1.5 text-[14px] font-medium font-['Rubik'] flex-shrink-0 ${course.status === "completed"
                                    ? "text-[#A85236]"
                                    : "text-[#A85236]"
                                }`}
                        >
                            {course.status === "completed" ? (
                                <>
                                    <FiDownload className="w-4 h-4" />
                                    Download Certificate
                                </>
                            ) : (
                                <>
                                    <FiEye className="w-4 h-4" />
                                    Preview Certificate
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* View More Link */}
            <div className="text-center mt-6">
                <Link
                    to="/my-learning"
                    className="text-[14px] font-medium text-[#A85236] hover:text-[#8a4329] font-['Rubik'] transition-colors"
                >
                    View More Courses
                </Link>
            </div>
        </div>
    );
};

export default ProfileLearningList;
