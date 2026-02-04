import React from 'react';
import { useAppI18n } from "@/hooks/useAppI18n";
import { FiArrowRight } from "react-icons/fi";

// Icon components matching the design
const BookIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
    >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8M8 11h6" />
    </svg>
);

const UsersIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
    >
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <circle cx="17" cy="7" r="3" />
        <path d="M21 21v-2a3 3 0 0 0-2-2.83" />
    </svg>
);

const CertificateIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
    >
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
        <circle cx="12" cy="10" r="2" />
    </svg>
);

const HeroStats = () => {
    const { t, isRTL } = useAppI18n();
    const floatingShadow = "shadow-[0_18px_40px_-28px_hsl(var(--foreground)/0.22),0_6px_18px_-12px_hsl(var(--foreground)/0.10)]";

    const avatars = [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
    ];

    return (
        <div className="flex w-full flex-wrap items-center gap-4 lg:gap-10 lg:flex-nowrap">
            {/* Stats Card */}
            <div
                className={`flex items-center justify-between px-12 rounded-2xl bg-surface ${floatingShadow} lg:w-[35.5rem] h-[11.625rem]`}
            >
                {/* 500+ Courses */}
                <div className="text-center">
                    <div className="flex justify-center mb-1.5">
                        <BookIcon />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                        500+
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {t("stats.courses")}
                    </div>
                </div>

                {/* 50K+ Active Learners */}
                <div className="text-center">
                    <div className="flex justify-center mb-1.5">
                        <UsersIcon />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                        50K+
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {t("stats.activeLearners")}
                    </div>
                </div>

                {/* 200+ Certifications */}
                <div className="text-center">
                    <div className="flex justify-center mb-1.5">
                        <CertificateIcon />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                        200+
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {t("stats.certifications")}
                    </div>
                </div>
            </div>

            {/* Learning Process Card */}
            <div
                className={`flex flex-col justify-between px-6 py-5 rounded-2xl bg-surface ${floatingShadow} lg:w-[16.25rem] h-[11.625rem]`}
            >
                <div>
                    <p className="text-sm font-semibold mb-4 leading-snug text-foreground">
                        {t("hero.processSimple").split(/(\n)/).map((line, i) =>
                            line === "\n" ? <br key={i} /> : line
                        )}
                    </p>
                </div>
                <div>
                    <span className="inline-block px-4 py-1.5 text-[0.8125rem] font-medium rounded-full border border-border text-foreground">
                        {t("hero.online")}
                    </span>
                </div>
            </div>

            {/* Study at your own pace Card */}
            <div className="relative lg:w-[16.6875rem]">
                <div
                    className="flex h-[11.625rem] flex-col justify-between rounded-[20px] bg-white px-6 py-6 card-mask"
                >
                    <p className="text-lg font-bold leading-tight text-foreground max-w-[80%]">
                        {t("hero.studyPace").split(/(\n)/).map((line, i) =>
                            line === "\n" ? <br key={i} /> : line
                        )}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-4">
                            {avatars.slice(0, 2).map((avatar, index) => (
                                <div
                                    key={index}
                                    className="w-12 h-12 rounded-2xl overflow-hidden border-[3px] border-white z-10"
                                >
                                    <img src={avatar} alt="Learner" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Circular CTA placed in the cutout */}
                <button
                    className={`absolute bottom-0 ${isRTL ? "left-0" : "right-0"} w-[3.5rem] h-[3.5rem] rounded-full text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 bg-sunbird-brick`}
                    aria-label="Go"
                >
                    {isRTL ? (
                        <FiArrowRight className="w-6 h-6 rotate-180" />
                    ) : (
                        <FiArrowRight className="w-6 h-6" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default HeroStats;
