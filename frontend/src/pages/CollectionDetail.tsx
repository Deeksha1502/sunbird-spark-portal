import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiPlay, FiChevronDown, FiChevronUp, FiArrowRight, FiStar, FiShare2 } from "react-icons/fi";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/collapsible"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { useAppI18n } from "@/hooks/useAppI18n";

// Import resource images
import resourceRobotHand from "@/assets/resource-robot-hand.png";
import resourceVR from "@/assets/resource-vr.png";
import resourceHacker from "@/assets/resource-hacker.png";

// Import video and document icons
import iconVideo from "@/assets/icon-video.png";
import iconDocument from "@/assets/icon-document.png";

// Video/Document icons using imported images
const VideoIcon = () => (
    <img src={iconVideo} alt="Video" className="flex-shrink-0" style={{ width: '22px', height: '14px' }} />
);

const DocumentIcon = () => (
    <img src={iconDocument} alt="Document" className="flex-shrink-0" style={{ width: '17px', height: '21px' }} />
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#B94A2C] flex-shrink-0">
        <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Mock collection data
const collectionData = {
    id: "1",
    title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
    rating: 4.5,
    learners: "9k",
    lessons: 25,
    image: resourceRobotHand,
    weeks: 4,
    description: "Introduction to Cyber Security course for beginners is designed to give you a foundational look at today's cybersecurity landscape and provide you with the tools to evaluate and manage security protocols in information processing systems.",
    skills: [
        "Business analysis, planning, and monitoring",
        "Elicitation and collaboration",
        "Requirements life cycle management",
        "Business intelligence perspective",
        "Requirements analysis and design definition",
    ],
    bestSuitedFor: [
        "Business Analyst",
        "Data Analyst",
        "Business Analyst",
        "Analytics Managers",
    ],
    modules: [
        {
            id: "week-1",
            title: "Week 1: Foundation & Basics",
            subtitle: "Business analysis, planning, and monitoring",
            lessons: [
                { id: "1-1", title: "0.1 Overview", duration: "04:56", type: "video" as const },
                { id: "1-2", title: "0.2 Business Decisions and Analytics", duration: "04:56", type: "document" as const },
                { id: "1-3", title: "0.3 Types of Business Analytics", duration: "04:56", type: "video" as const },
                { id: "1-4", title: "0.4 Applications of Business Analytics", duration: "04:56", type: "video" as const },
                { id: "1-5", title: "0.5 Data Science Overview", duration: "04:56", type: "document" as const },
            ],
        },
        {
            id: "week-2",
            title: "Week 2: Core Competencies",
            subtitle: "Business analysis, planning, and monitoring",
            lessons: [
                { id: "2-1", title: "1.1 Advanced Concepts", duration: "05:30", type: "video" as const },
                { id: "2-2", title: "1.2 Practical Applications", duration: "06:15", type: "document" as const },
            ],
        },
    ],
    relatedContent: [
        {
            id: "r-1",
            title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
            type: "Course",
            image: resourceRobotHand,
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "r-2",
            title: "Generative AI for Cybersecurity Professionals",
            type: "PDF",
            image: resourceHacker,
            isResource: true,
        },
        {
            id: "r-3",
            title: "Data Engineering Foundations",
            type: "Textbook",
            image: resourceVR,
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
    ],
};

const CollectionDetail = () => {
    const { collectionId } = useParams();
    const navigate = useNavigate();
    const { t } = useAppI18n();
    const [expandedModules, setExpandedModules] = useState<string[]>(["week-1"]);
    const [isLoading, setIsLoading] = useState(true);

    const toggleModule = (moduleId: string) => {
        setExpandedModules((prev) =>
            prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
        );
    };

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [collectionId]);

    if (isLoading) {
        return <PageLoader message={t("loading")} />;
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Header />

            <main className="container mx-auto px-4 py-6">
                {/* Go Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#B94A2C] text-sm font-medium mb-6 hover:opacity-80 transition-opacity"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    {t("button.goBack")}
                </button>

                {/* Title Row */}
                <div className="flex items-start justify-between mb-2">
                    <h1 className="text-xl md:text-2xl font-semibold text-foreground max-w-[75%]">
                        {collectionData.title}
                    </h1>
                    <button className="flex items-center gap-2 text-[#B94A2C] text-sm font-medium hover:opacity-80 transition-opacity">
                        <FiShare2 className="w-4 h-4" />
                        {t("button.share")}
                    </button>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <span className="flex items-center gap-1">
                        {collectionData.rating}
                        <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>{collectionData.learners} {t("contentStats.learners")}</span>
                    <span className="text-gray-300">•</span>
                    <span>{collectionData.lessons} {t("contentStats.lessons")}</span>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-[1fr_340px] gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Video Player Card */}
                        <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
                            <div className="relative">
                                {/* Week Label */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-[#B94A2C] text-white text-sm font-medium px-4 py-2 rounded-md">
                                        Week 1: Foundation & Basics
                                    </span>
                                </div>

                                {/* Video Thumbnail */}
                                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900 relative">
                                    <img
                                        src={collectionData.image}
                                        alt={collectionData.title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Play Button */}
                                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                                        <FiPlay className="w-6 h-6 text-[#B94A2C] ml-1" fill="#B94A2C" />
                                    </button>
                                </div>
                            </div>

                            {/* Course Overview Section */}
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-3">{t("courseDetails.overview")}</h2>

                                {/* Duration Stats */}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <span className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#B94A2C]">
                                            <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                        {collectionData.weeks} {t("courseDetails.weeks")}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#B94A2C]">
                                            <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M5 8H11M5 11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        {collectionData.lessons} {t("contentStats.lessons")}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                    {collectionData.description}
                                </p>

                                {/* Skills Grid */}
                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
                                    {/* Skills Column */}
                                    <div>
                                        <h3 className="text-base font-semibold text-foreground mb-3">{t("courseDetails.skills")}</h3>
                                        <ul className="space-y-2">
                                            {collectionData.skills.map((skill, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckIcon />
                                                    <span>{skill}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Best Suited For Column */}
                                    <div>
                                        <h3 className="text-base font-semibold text-foreground mb-3">{t("courseDetails.suitedFor")}</h3>
                                        <ul className="space-y-2">
                                            {collectionData.bestSuitedFor.map((role, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckIcon />
                                                    <span>{role}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Lessons Accordion */}
                    <div className="space-y-3">
                        {collectionData.modules.map((module) => (
                            <Collapsible
                                key={module.id}
                                open={expandedModules.includes(module.id)}
                                onOpenChange={() => toggleModule(module.id)}
                            >
                                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                    <CollapsibleTrigger asChild>
                                        <button className="w-full p-4 flex items-start justify-between text-left hover:bg-gray-50 transition-colors">
                                            <div className="flex-1 pr-4">
                                                <h3 className="font-semibold text-foreground text-sm mb-1">
                                                    {module.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {module.subtitle}
                                                </p>
                                            </div>
                                            {expandedModules.includes(module.id) ? (
                                                <FiChevronUp className="w-5 h-5 text-[#B94A2C] flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <FiChevronDown className="w-5 h-5 text-[#B94A2C] flex-shrink-0 mt-0.5" />
                                            )}
                                        </button>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <div className="p-3 pt-0 space-y-2">
                                            {module.lessons.map((lesson) => (
                                                <Link
                                                    key={lesson.id}
                                                    to={`/course/${collectionId}/lesson/${lesson.id}`}
                                                    className="flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3 hover:bg-gray-200 transition-colors"
                                                >
                                                    {lesson.type === "video" ? <VideoIcon /> : <DocumentIcon />}
                                                    <span className="flex-1 text-sm font-medium text-foreground leading-snug">
                                                        {lesson.title}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground flex-shrink-0">
                                                        {lesson.duration}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>
                        ))}
                    </div>
                </div>

                {/* Related Content Section */}
                <section className="mt-16">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-xl font-semibold text-foreground">{t("courseDetails.relatedContent")}</h2>
                        <FiArrowRight className="w-5 h-5 text-[#B94A2C]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr">
                        {collectionData.relatedContent.map((item) =>
                            item.isResource ? (
                                <RelatedResourceCard key={item.id} item={item} />
                            ) : (
                                <RelatedCourseCard key={item.id} item={item} />
                            )
                        )}
                    </div>

                    {/* Carousel Navigation */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                            <FiArrowLeft className="w-4 h-4 text-gray-500" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-1 bg-gray-800 rounded-full" />
                            <div className="w-6 h-1 bg-gray-300 rounded-full" />
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#B94A2C] flex items-center justify-center hover:bg-[#A04030] transition-colors">
                            <FiArrowRight className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

// Related Content Cards
interface RelatedItem {
    id: string;
    title: string;
    type: string;
    image: string;
    isResource?: boolean;
    rating?: number;
    learners?: string;
    lessons?: number;
}

const RelatedCourseCard = ({ item }: { item: RelatedItem }) => {
    const { t } = useAppI18n();
    return (
        <Link to={`/collection/${item.id}`} className="group h-full">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <span className="inline-block text-xs font-medium text-foreground bg-[#FFF1C7] border border-[#CC8545] rounded-full px-3 py-1 mb-2">
                        {t(`contentTypes.${item.type.toLowerCase()}`) || item.type}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground leading-snug mb-3 line-clamp-2 flex-1">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            {item.rating}
                            <FiStar className="w-3 h-3 text-amber-400 fill-amber-400" />
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>{item.learners} {t("contentStats.learners")}</span>
                        <span className="text-gray-300">•</span>
                        <span>{item.lessons} {t("contentStats.lessons")}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

const RelatedResourceCard = ({ item }: { item: RelatedItem }) => {
    const { t } = useAppI18n();

    return (
        <Link to={`/collection/${item.id}`} className="group h-full">
            <div className="rounded-xl overflow-hidden relative h-full min-h-[240px]">
                <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white text-foreground text-xs font-medium px-3 py-1.5 rounded-md">
                        {t(`contentTypes.${item.type.toLowerCase()}`) || item.type}
                    </span>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3
                        className="text-white font-semibold text-base leading-snug mb-2"
                        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
                    >
                        {item.title}
                    </h3>
                    <p
                        className="text-white/90 text-sm font-medium flex items-center gap-2"
                        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}
                    >
                        {t("resource.seeCaseStudy")}
                        <FiArrowRight className="w-3.5 h-3.5" />
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default CollectionDetail;
