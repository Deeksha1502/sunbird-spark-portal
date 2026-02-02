const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StudentsIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 11C1 9.34315 2.34315 8 4 8H6C7.65685 8 9 9.34315 9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 8C11.6569 8 13 9.34315 13 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const upcomingClassesData = [
    {
        date: "Feb 12",
        classes: [
            { id: "1", time: "20:00", title: "Business Decisions and Analytics", duration: "1hr", students: 100 },
            { id: "2", time: "18:00", title: "Types of Business Analytics", duration: "3hrs", students: 200 },
        ],
    },
    {
        date: "March 05",
        classes: [
            { id: "3", time: "10:00", title: "Introduction to Data Science", duration: "2hrs", students: 150 },
        ],
    },
];

const MyLearningUpcomingClasses = () => {
    return (
        <div className="bg-white rounded-2xl p-5">
            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-['Rubik']">Upcoming Classes</h3>

            {/* Classes by Date */}
            <div className="space-y-4">
                {upcomingClassesData.map((dateGroup) => (
                    <div key={dateGroup.date}>
                        {/* Date Header */}
                        <div className="text-xs font-medium text-gray-500 mb-2 font-['Rubik']">
                            {dateGroup.date}
                        </div>

                        {/* Classes */}
                        <div className="space-y-2">
                            {dateGroup.classes.map((classItem) => (
                                <div
                                    key={classItem.id}
                                    className="flex items-start gap-3 p-3 bg-[#FFFEF4] rounded-lg"
                                >
                                    {/* Time */}
                                    <div className="flex-shrink-0">
                                        <span className="text-sm font-semibold text-[#A85236] font-['Rubik']">
                                            {classItem.time}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1 font-['Rubik']">
                                            {classItem.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 font-['Rubik']">
                                            <div className="flex items-center gap-1">
                                                <ClockIcon />
                                                <span>{classItem.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <StudentsIcon />
                                                <span>{classItem.students} Students</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyLearningUpcomingClasses;
