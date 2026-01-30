import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import { useAppI18n } from "@/hooks/useAppI18n";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar";
import heroWoman from "@/assets/hero-woman-new.png";
import creamWave from "@/assets/cream-wave.png";
import tealShape from "@/assets/teal-shape.png";

const HeroWithStats = () => {
    const { t } = useAppI18n();

    const avatars = [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
    ];

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

    const floatingShadow =
        "shadow-[0_18px_40px_-28px_hsl(var(--foreground)/0.22),0_6px_18px_-12px_hsl(var(--foreground)/0.10)]";

    return (
        <section className="relative">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white pb-32 lg:pb-40">
                {/* Cream Wave Background - positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 w-full">
                    <img
                        src={creamWave}
                        alt=""
                        className="w-full h-auto object-cover"
                        style={{ minHeight: '200px' }}
                    />
                </div>

                {/* Decorative dots */}
                <div
                    className="absolute w-8 h-8 rounded-full hidden lg:block"
                    style={{ backgroundColor: '#B94A2C', top: '15%', right: '38%' }}
                />
                <div
                    className="absolute w-10 h-10 rounded-full hidden lg:block"
                    style={{ backgroundColor: '#FFD954', top: '45%', right: '48%' }}
                />
                <div
                    className="absolute w-4 h-4 rounded-full hidden lg:block"
                    style={{ backgroundColor: '#B94A2C', top: '32%', right: '8%' }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[420px] py-12 lg:py-16">
                        {/* Content - Left Side */}
                        <div className="text-left max-w-xl">
                            <h1
                                className="text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] mb-6"
                                style={{ color: '#1A1A1A', fontFamily: 'Rubik, sans-serif' }}
                            >
                                {t("hero.title", "Knowledge that moves you forward.").split(/(\n)/).map((line, i) =>
                                    line === "\n" ? <br key={i} /> : line
                                )}
                            </h1>

                            <p
                                className="text-[15px] md:text-[16px] mb-8 leading-relaxed max-w-md"
                                style={{ color: '#6B7280', fontFamily: 'Rubik, sans-serif' }}
                            >
                                {t("hero.subtitle")}
                            </p>

                            <Link to="/explore">
                                <Button
                                    size="lg"
                                    className="text-white font-semibold text-[15px] px-7 h-12 rounded-full shadow-md hover:shadow-lg transition-all"
                                    style={{ backgroundColor: '#B94A2C', fontFamily: 'Rubik, sans-serif' }}
                                >
                                    {t("hero.cta")}
                                    <FiArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>

                        {/* Hero Image with teal shape - Right Side */}
                        <div className="hidden lg:flex justify-end items-end relative h-[400px]">
                            {/* Teal pill shape background */}
                            <div className="absolute bottom-0 right-0 w-[340px]">
                                <img
                                    src={tealShape}
                                    alt=""
                                    className="w-full h-auto"
                                    style={{ transform: 'rotate(-25deg)', transformOrigin: 'center' }}
                                />
                            </div>

                            {/* Woman image */}
                            <div className="relative z-10 flex items-end justify-center h-full">
                                <img
                                    src={heroWoman}
                                    alt="Professional learning"
                                    className="w-[360px] h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Stats Cards - Positioned to overlap and align with hero content */}
            <div className="relative z-20 -mt-24 lg:-mt-28">
                <div className="container mx-auto px-4">
                    {/* Cards aligned to match hero content width - no centering */}
                    <div className="flex w-full flex-wrap items-end gap-4 lg:gap-5 lg:flex-nowrap lg:justify-between">
                        {/* Stats Card */}
                        <div
                            className={`flex items-center gap-8 px-8 py-6 rounded-2xl bg-surface ${floatingShadow} lg:w-[480px]`}
                        >
                            {/* 500+ Courses */}
                            <div className="text-center">
                                <div className="flex justify-center mb-1.5">
                                    <BookIcon />
                                </div>
                                <div
                                    className="text-2xl md:text-3xl font-bold text-foreground"
                                >
                                    500+
                                </div>
                                <div
                                    className="text-xs text-muted-foreground"
                                >
                                    {t("stats.courses")}
                                </div>
                            </div>

                            {/* 50K+ Active Learners */}
                            <div className="text-center">
                                <div className="flex justify-center mb-1.5">
                                    <UsersIcon />
                                </div>
                                <div
                                    className="text-2xl md:text-3xl font-bold text-foreground"
                                >
                                    50K+
                                </div>
                                <div
                                    className="text-xs text-muted-foreground"
                                >
                                    {t("stats.activeLearners")}
                                </div>
                            </div>

                            {/* 200+ Certifications */}
                            <div className="text-center">
                                <div className="flex justify-center mb-1.5">
                                    <CertificateIcon />
                                </div>
                                <div
                                    className="text-2xl md:text-3xl font-bold text-foreground"
                                >
                                    200+
                                </div>
                                <div
                                    className="text-xs text-muted-foreground"
                                >
                                    {t("stats.certifications")}
                                </div>
                            </div>
                        </div>

                        {/* Learning Process Card */}
                        <div
                            className={`flex flex-col justify-between px-6 py-5 rounded-2xl bg-surface ${floatingShadow} lg:w-[260px]`}
                        >
                            <div>
                                <p
                                    className="text-[14px] font-semibold mb-4 leading-snug text-foreground"
                                >
                                    {t("hero.processSimple")}
                                </p>
                            </div>
                            <div>
                                <span
                                    className="inline-block px-4 py-1.5 text-[13px] font-medium rounded-full border border-border text-foreground"
                                >
                                    {t("hero.online")}
                                </span>
                            </div>
                        </div>

                        {/* Study at your own pace Card */}
                        <div className="relative lg:w-[280px]">
                            <div
                                className={`flex h-full flex-col justify-between rounded-2xl bg-surface px-6 py-5 ${floatingShadow} lg:mr-6`}
                            >
                                <p className="text-[14px] font-semibold mb-4 leading-snug text-foreground">
                                    {t("hero.studyPace")}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-3">
                                        {avatars.map((avatar, index) => (
                                            <Avatar
                                                key={index}
                                                className="w-10 h-10 border-2 border-surface rounded-full overflow-hidden"
                                            >
                                                <AvatarImage src={avatar} alt="Learner" className="object-cover" />
                                                <AvatarFallback>L</AvatarFallback>
                                            </Avatar>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Circular CTA that visually overhangs the card */}
                            <button
                                className="absolute bottom-5 right-0 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                                aria-label="Go"
                            >
                                <FiArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cream background extension that passes under the cards */}
            <div
                className="h-16 lg:h-20 -mt-12 lg:-mt-16 bg-background"
            />
        </section>
    );
};

export default HeroWithStats;
