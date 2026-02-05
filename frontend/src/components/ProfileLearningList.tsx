import { useState } from "react";
import { Link } from "react-router-dom";


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
        title: "The AI Engineer Course 2026: \n Complete AI Engineer Bootcamp",
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
        title: "The AI Engineer Course 2026: \n Complete AI Engineer Bootcamp",
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
                        className="flex justify-between items-center p-5 bg-white border border-gray-100 rounded-[1.25rem] shadow-sm"
                    >
                        {/* Thumbnail */}
                        <div className="w-[70px] flex-shrink-0">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-[4.375rem] h-[4.375rem] rounded-xl object-cover"
                            />
                        </div>

                        {/* Title and Due Date */}
                        <div className="w-[320px] flex-shrink-0 pr-4">
                            <h4 className="text-[17px] font-medium text-foreground leading-6 mb-1 whitespace-pre-wrap">
                                {course.title}
                            </h4>
                            <p className="text-[14px] text-[#666666] font-normal">
                                Due Date : {course.dueDate}
                            </p>
                        </div>

                        {/* Progress Ring + Percentage */}
                        <div className="w-[100px] flex-shrink-0 flex items-center justify-center gap-2">
                            <ProgressRing progress={course.progress} />
                            <span className="text-[16px] font-medium text-[#222222] w-10">
                                {course.progress}%
                            </span>
                        </div>

                        {/* Status Badge */}
                        <div className="w-[120px] flex-shrink-0 flex items-center justify-center">
                            <div
                                className={`px-5 py-1.5 rounded-full border ${course.status === "completed"
                                    ? "bg-[#E6F3EA] border-[#B2DDBF] text-[#2D6A4F]"
                                    : "bg-[#FFF8EB] border-[#FCE6BD] text-[#826404]"
                                    }`}
                            >
                                <span className="text-sm font-medium">
                                    {course.status === "completed" ? "Completed" : "Ongoing"}
                                </span>
                            </div>
                        </div>

                        {/* Certificate Action */}
                        <div className="w-[200px] flex-shrink-0 flex items-center justify-end">
                            <button
                                className="flex items-center gap-2 text-[13px] font-medium text-[#A85236] hover:opacity-80 transition-opacity"
                            >
                                {course.status === "completed" ? (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09173 11.9083C1.87295 11.6895 1.75 11.3928 1.75 11.0833V8.75" stroke="#CC8545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.0835 5.83334L7.00016 8.75L9.91683 5.83334" stroke="#CC8545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 1.75V8.75" stroke="#CC8545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Download Certificate</span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5C1 5 3.18182 1 7 1C10.8182 1 13 5 13 5C13 5 10.8182 9 7 9C3.18182 9 1 5 1 5Z" stroke="#CC8545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 6.33333C7.73638 6.33333 8.33333 5.73638 8.33333 5C8.33333 4.26362 7.73638 3.66667 7 3.66667C6.26362 3.66667 5.66667 4.26362 5.66667 5C5.66667 5.73638 6.26362 6.33333 7 6.33333Z" stroke="#CC8545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
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
                    className="text-sm font-medium text-[#A85236] hover:opacity-80 transition-opacity"
                >
                    View More Courses
                </Link>
            </div>
        </div>
    );
};

export default ProfileLearningList;
