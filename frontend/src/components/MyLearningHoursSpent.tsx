const MyLearningHoursSpent = () => {
    const totalHours = 130;
    const lessonsVisited = { current: 10, total: 30 };
    const contentsCompleted = { current: 2, total: 10 };

    // SVG Donut chart calculations
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const lessonsProgress = (lessonsVisited.current / lessonsVisited.total) * circumference;
    const contentsProgress = (contentsCompleted.current / contentsCompleted.total) * circumference;

    return (
        <div className="bg-white rounded-2xl p-5">
            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-['Rubik']">Total Hrs Spent</h3>

            <div className="flex items-center gap-6">
                {/* Donut Chart */}
                <div className="relative flex-shrink-0">
                    <svg width="110" height="110" viewBox="0 0 110 110">
                        {/* Background circle */}
                        <circle
                            cx="55"
                            cy="55"
                            r={radius}
                            fill="none"
                            stroke="#F0CE94"
                            strokeWidth="12"
                        />
                        {/* Progress circle - lessons */}
                        <circle
                            cx="55"
                            cy="55"
                            r={radius}
                            fill="none"
                            stroke="#A85236"
                            strokeWidth="12"
                            strokeDasharray={`${lessonsProgress} ${circumference}`}
                            strokeLinecap="round"
                            transform="rotate(-90 55 55)"
                        />
                        {/* Progress circle - contents (second segment) */}
                        <circle
                            cx="55"
                            cy="55"
                            r={radius}
                            fill="none"
                            stroke="#CC8545"
                            strokeWidth="12"
                            strokeDasharray={`${contentsProgress} ${circumference}`}
                            strokeLinecap="round"
                            transform={`rotate(${(lessonsProgress / circumference) * 360 - 90} 55 55)`}
                        />
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900 font-['Rubik']">{totalHours}</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex-1 space-y-4">
                    {/* Lessons Visited */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 font-['Rubik']">
                                {lessonsVisited.current}/{lessonsVisited.total} Lesson visited
                            </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#A85236] rounded-full"
                                style={{ width: `${(lessonsVisited.current / lessonsVisited.total) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Contents Completed */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 font-['Rubik']">
                                {contentsCompleted.current}/{contentsCompleted.total} Contents completed
                            </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#CC8545] rounded-full"
                                style={{ width: `${(contentsCompleted.current / contentsCompleted.total) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLearningHoursSpent;
