// Custom icons matching the design exactly
const TimeSpentIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
);

const BadgesIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const ContentsCompletedIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <polyline points="9 11 12 14 22 4" />
    </svg>
);

const CertificationsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <circle cx="12" cy="16" r="2" />
    </svg>
);

const statsData = [
    {
        id: "time-spent",
        value: "30",
        label: "Time Spent on\nthe platform",
        bgColor: "bg-sunbird-wave",
        icon: TimeSpentIcon,
    },
    {
        id: "badges",
        value: "05",
        label: "Badges",
        bgColor: "bg-sunbird-ginger",
        icon: BadgesIcon,
    },
    {
        id: "completed",
        value: "13",
        label: "Contents Completed",
        bgColor: "bg-sunbird-moss",
        icon: ContentsCompletedIcon,
    },
    {
        id: "certs",
        value: "06",
        label: "Certifications Earned",
        bgColor: "bg-sunbird-lavender",
        icon: CertificationsIcon,
    },
];

const ProfileStatsCards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {statsData.map((stat) => {
                const IconComponent = stat.icon;
                return (
                    <div
                        key={stat.id}
                        className={`${stat.bgColor} rounded-[1.25rem] p-5 text-white relative min-h-[8.75rem] flex flex-col justify-end`}
                    >
                        {/* Icon in top-right */}
                        <div className="absolute top-4 right-4 bg-white/20 p-2.5 rounded-lg">
                            <IconComponent />
                        </div>

                        {/* Value */}
                        <div className="text-[2.5rem] font-bold mb-1 leading-none">
                            {stat.value}
                        </div>

                        {/* Label */}
                        <div className="text-sm text-white/90 whitespace-pre-line leading-tight">
                            {stat.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProfileStatsCards;
