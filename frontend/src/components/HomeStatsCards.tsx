// Custom icons matching the design
const DocumentPlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
);

const ClockProgressIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
        <path d="M22 12c0-1.5-.5-3-1.5-4" />
    </svg>
);

const CheckboxIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <polyline points="9 11 12 14 22 4" />
    </svg>
);

const CertificateIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <circle cx="12" cy="16" r="2" />
    </svg>
);

const statsData = [
    {
        id: "total",
        value: "30",
        label: "Total Contents",
        bgColor: "bg-[#70ADBF]",
        icon: DocumentPlusIcon,
    },
    {
        id: "progress",
        value: "05",
        label: "Contents in Progress",
        bgColor: "bg-[#CC8545]",
        icon: ClockProgressIcon,
    },
    {
        id: "completed",
        value: "13",
        label: "Contents Completed",
        bgColor: "bg-[#66A682]",
        icon: CheckboxIcon,
    },
    {
        id: "certs",
        value: "06",
        label: "Certifications Earned",
        bgColor: "bg-[#99708A]",
        icon: CertificateIcon,
    },
];

const HomeStatsCards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.id}
                        className={`${stat.bgColor} rounded-2xl p-5 relative overflow-hidden`}
                    >
                        {/* Icon in top right */}
                        <div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center bg-white/20 text-white">
                            <Icon />
                        </div>

                        {/* Value */}
                        <h3 className="text-4xl font-bold mb-1 text-white">
                            {stat.value}
                        </h3>

                        {/* Label */}
                        <p className="text-sm text-white/90">
                            {stat.label}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default HomeStatsCards;
