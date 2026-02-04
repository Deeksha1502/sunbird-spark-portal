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
        <div className="bg-white rounded-[1.25rem] p-6">
            {/* Header with Filter */}
            <div className="flex items-center justify-between mb-6 relative">
                <div className="flex items-center">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-[5px] h-5 bg-[#CC8545]" />
                    <h2 className="text-[22px] font-medium text-foreground ml-2">
                        My Learning
                    </h2>
                </div>

                <div className="flex items-center gap-2 pr-2">
                    <span className="text-sm font-medium text-foreground">Filter :</span>
                    <div className="relative flex items-center">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as FilterType)}
                            className="text-sm text-foreground border-none bg-transparent focus:outline-none cursor-pointer appearance-none pr-5 font-medium"
                        >
                            <option value="all">All</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            className="absolute right-0 pointer-events-none text-sunbird-brick"
                        >
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Course List */}
            <div className="space-y-4">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="flex items-center p-5 bg-white border border-gray-100 rounded-[1.25rem] shadow-sm"
                    >
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 mr-4">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-[4.375rem] h-[4.375rem] rounded-xl object-cover"
                            />
                        </div>

                        {/* Title and Due Date */}
                        <div className="flex-[2] min-w-0 pr-4">
                            <h4 className="text-[17px] font-medium text-foreground line-clamp-2 leading-snug mb-1">
                                {course.title}
                            </h4>
                            <p className="text-sm text-muted-foreground font-light">
                                Due Date : {course.dueDate}
                            </p>
                        </div>

                        {/* Progress Ring + Percentage */}
                        <div className="flex-1 flex items-center justify-center gap-3">
                            <ProgressRing progress={course.progress} />
                            <span className="text-base font-medium text-gray-700 w-10">
                                {course.progress}%
                            </span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex-1 flex justify-center">
                            <div
                                className={`px-5 py-1.5 rounded-full border ${course.status === "completed"
                                    ? "bg-[#E6F3EA] border-[#B2DDBF]"
                                    : "bg-[#FFF8EB] border-[#FCE6BD]"
                                    }`}
                            >
                                <span className="text-sm font-medium text-gray-800">
                                    {course.status === "completed" ? "Completed" : "Ongoing"}
                                </span>
                            </div>
                        </div>

                        {/* Certificate Action */}
                        <div className="flex-1 flex justify-end">
                            <button
                                className="flex items-center gap-2 text-[15px] font-medium text-sunbird-brick hover:opacity-80 transition-opacity"
                            >
                                {course.status === "completed" ? (
                                    <>
                                        <FiDownload className="w-5 h-5" />
                                        <span>Download Certificate</span>
                                    </>
                                ) : (
                                    <>
                                        <FiEye className="w-5 h-5" />
                                        <span>Preview Certificate</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More Link */}
            <div className="text-center mt-6">
                <Link
                    to="/my-learning"
                    className="text-sm font-medium text-sunbird-brick hover:text-sunbird-brick/80 transition-colors"
                >
                    View More Courses
                </Link>
            </div>
        </div>
    );
};

export default ProfileLearningList;
