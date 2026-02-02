import { useState } from "react";
import { Link } from "react-router-dom";

const ChevronDownIcon = () => (
    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 0.5L4 3.5L7 0.5" stroke="#CC8545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const coursesData = [
    {
        id: "1",
        title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
        progress: 30,
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop",
    },
    {
        id: "2",
        title: "Data Engineering Foundations",
        progress: 70,
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop",
    },
    {
        id: "3",
        title: "Machine Learning Fundamentals",
        progress: 45,
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop",
    },
    {
        id: "4",
        title: "Cloud Architecture Essentials",
        progress: 85,
        thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop",
    },
];

type TabType = "active" | "completed" | "upcoming" | "paused";

const tabs: { id: TabType; label: string }[] = [
    { id: "active", label: "Active Courses" },
    { id: "completed", label: "Completed" },
    { id: "upcoming", label: "Upcoming" },
    { id: "paused", label: "Paused" },
];

const MyLearningCourses = () => {
    const [activeTab, setActiveTab] = useState<TabType>("active");

    return (
        <div className="bg-white rounded-2xl p-5 h-full">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 font-['Rubik']">Courses</h3>
                <ChevronDownIcon />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium font-['Rubik'] transition-colors ${activeTab === tab.id
                                ? "bg-[#A85236] text-white"
                                : "bg-transparent border border-[#A85236] text-[#A85236] hover:bg-[#A85236]/10"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Course List */}
            <div className="space-y-4">
                {coursesData.map((course) => (
                    <div
                        key={course.id}
                        className="flex gap-5 p-4 bg-white rounded-[20px] shadow-[2px_2px_20px_rgba(0,0,0,0.09)]"
                    >
                        {/* Thumbnail */}
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-[126px] h-[125px] rounded-[15px] object-cover flex-shrink-0"
                        />

                        {/* Content */}
                        <div className="flex-1 min-w-0 py-2">
                            <h4 className="font-medium text-[20px] leading-[28px] text-[#222222] line-clamp-2 mb-3 font-['Rubik']">
                                {course.title}
                            </h4>
                            <p className="text-[16px] leading-[19px] font-normal text-[#222222] mb-2 font-['Rubik']">
                                Completed : {course.progress}%
                            </p>
                            {/* Progress Bar */}
                            <div className="h-1.5 bg-[#F4F4F4] rounded-[10px] max-w-[313px]">
                                <div
                                    className="h-full bg-[#A85236] rounded-[10px] transition-all"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More Link */}
            <Link
                to="/courses"
                className="block mt-5 text-sm font-medium font-['Rubik'] text-[#A85236] hover:text-[#8a4329] transition-colors"
            >
                View More Courses →
            </Link>
        </div>
    );
};

export default MyLearningCourses;
