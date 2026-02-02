import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiPlay, FiArrowRight, FiStar, FiShare2 } from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { useAppI18n } from "@/hooks/useAppI18n";

// Import resource images
import resourceRobotHand from "@/assets/resource-robot-hand.png";
import resourceVR from "@/assets/resource-vr.png";
import resourceHacker from "@/assets/resource-hacker.png";

// Mock content data
const contentData = {
    id: "1",
    title: "The AI Engineer Introduction",
    rating: 4.5,
    learners: "9k",
    lessons: 25,
    image: resourceRobotHand,
    currentWeek: "Week 1: Foundation & Basics",
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

const ContentRead = () => {
    const { contentId } = useParams();
    const navigate = useNavigate();
    const { currentCode, changeLanguage } = useAppI18n();
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [contentId]);

    if (isLoading) {
        return <PageLoader message="Loading content..." />;
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Header />

            <main className="container mx-auto px-4 py-6">
                {/* Go Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#B94A2C] text-sm font-medium mb-6 hover:opacity-80 transition-opacity font-['Rubik']"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    Go Back
                </button>

                {/* Title Row */}
                <div className="flex items-start justify-between mb-2">
                    <h1 className="text-xl md:text-2xl font-semibold text-foreground max-w-[75%] font-['Rubik']">
                        {contentData.title}
                    </h1>
                    <button className="flex items-center gap-2 text-[#B94A2C] text-sm font-medium hover:opacity-80 transition-opacity font-['Rubik']">
                        <FiShare2 className="w-4 h-4" />
                        Share
                    </button>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 font-['Rubik']">
                    <span className="flex items-center gap-1">
                        {contentData.rating}
                        <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>{contentData.learners} Learners</span>
                    <span className="text-gray-300">•</span>
                    <span>{contentData.lessons} Lessons</span>
                </div>

                {/* Centered Video Player */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
                        <div className="relative">
                            {/* Week Label */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-[#B94A2C] text-white text-sm font-medium px-4 py-2 rounded-md font-['Rubik']">
                                    {contentData.currentWeek}
                                </span>
                            </div>

                            {/* Video Thumbnail */}
                            <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900 relative">
                                <img src={contentData.image} alt={contentData.title} className="w-full h-full object-cover" />

                                {/* Play Button */}
                                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                                    <FiPlay className="w-6 h-6 text-[#B94A2C] ml-1" fill="#B94A2C" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Content Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-xl font-semibold text-foreground font-['Rubik']">Related Content</h2>
                        <FiArrowRight className="w-5 h-5 text-[#B94A2C]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr">
                        {contentData.relatedContent.map((item) =>
                            item.isResource ? (
                                <RelatedResourceCard key={item.id} item={item} />
                            ) : (
                                <RelatedCourseCard key={item.id} item={item} />
                            ),
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

const RelatedCourseCard = ({ item }: { item: RelatedItem }) => (
    <Link to={`/content/${item.id}`} className="group h-full">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <span className="inline-block text-xs font-medium text-foreground bg-[#FFF1C7] border border-[#CC8545] rounded-full px-3 py-1 mb-2 w-fit font-['Rubik']">
                    {item.type}
                </span>
                <h3 className="text-sm font-semibold text-foreground leading-snug mb-3 line-clamp-2 flex-1 font-['Rubik']">
                    {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-['Rubik']">
                    <span className="flex items-center gap-1">
                        {item.rating}
                        <FiStar className="w-3 h-3 text-amber-400 fill-amber-400" />
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>{item.learners} Learners</span>
                    <span className="text-gray-300">•</span>
                    <span>{item.lessons} Lessons</span>
                </div>
            </div>
        </div>
    </Link>
);

const RelatedResourceCard = ({ item }: { item: RelatedItem }) => (
    <Link to={`/content/${item.id}`} className="group h-full">
        <div className="rounded-xl overflow-hidden relative h-full min-h-[240px]">
            <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Type Badge */}
            <div className="absolute top-4 left-4">
                <span className="inline-block bg-white text-foreground text-xs font-medium px-3 py-1.5 rounded-md font-['Rubik']">
                    {item.type}
                </span>
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-4">
                <h3
                    className="text-white font-semibold text-base leading-snug mb-2 font-['Rubik']"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
                >
                    {item.title}
                </h3>
                <p
                    className="text-white/90 text-sm font-medium flex items-center gap-2 font-['Rubik']"
                    style={{ textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}
                >
                    See the Case Study
                    <FiArrowRight className="w-3.5 h-3.5" />
                </p>
            </div>
        </div>
    </Link>
);

export default ContentRead;
