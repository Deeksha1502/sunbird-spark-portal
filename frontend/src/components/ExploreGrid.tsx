import { FiArrowRight } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { FilterState } from "@/pages/Explore";

// Import resource images
import resourceRobotHand from "@/assets/resource-robot-hand.png";
import resourceVR from "@/assets/resource-vr.png";
import resourceHardware from "@/assets/resource-hardware.png";
import resourceBitcoin from "@/assets/resource-bitcoin.png";
import resourceHacker from "@/assets/resource-hacker.png";
import resourceEthereum from "@/assets/resource-ethereum.png";
import { useAppI18n } from "@/hooks/useAppI18n";

interface ExploreGridProps {
    filters: FilterState;
}

type ContentType = "Course" | "Textbook" | "Video" | "PDF" | "Epub";

interface ExploreItem {
    id: string;
    title: string;
    type: ContentType;
    image: string;
    isResource?: boolean;
    rating?: number;
    learners?: string;
    lessons?: number;
}

const exploreItems: ExploreItem[] = [
    {
        id: "1",
        title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
        type: "Course",
        image: resourceRobotHand,
        rating: 4.5,
        learners: "9k",
        lessons: 25,
    },
    {
        id: "2",
        title: "Data Engineering Foundations",
        type: "Textbook",
        image: resourceVR,
        rating: 4.5,
        learners: "9k",
        lessons: 25,
    },
    {
        id: "3",
        title: "Elm Partners with Udacity to Build a Graduate Development Program",
        type: "Video",
        image: resourceRobotHand,
        isResource: true,
    },
    {
        id: "4",
        title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
        type: "Course",
        image: resourceRobotHand,
        rating: 4.5,
        learners: "9k",
        lessons: 25,
    },
    {
        id: "5",
        title: "Data Engineering Foundations",
        type: "Textbook",
        image: resourceVR,
        rating: 4.5,
        learners: "9k",
        lessons: 25,
    },
    {
        id: "6",
        title: "Generative AI for Cybersecurity Professionals",
        type: "Course",
        image: resourceHardware,
        rating: 4.5,
        learners: "9k",
        lessons: 25,
    },
    {
        id: "7",
        title: "Data Engineering Foundations",
        type: "PDF",
        image: resourceVR,
        isResource: true,
    },
    {
        id: "8",
        title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
        type: "Course",
        image: resourceHacker,
        rating: 4.5,
        learners: "9k",
        lessons: 25,
    },
    {
        id: "9",
        title: "Data Engineering Foundations",
        type: "Textbook",
        image: resourceEthereum,
        rating: 4.5,
        learners: "9k",
        lessons: 25,
    },
    {
        id: "10",
        title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
        type: "Course",
        image: resourceRobotHand,
        rating: 4.5,
        learners: "9k",
        lessons: 25,
    },
    {
        id: "11",
        title: "Bitcoin Engineering Foundations",
        type: "Epub",
        image: resourceBitcoin,
        isResource: true,
    },
    {
        id: "12",
        title: "Generative AI for Cybersecurity Professionals",
        type: "Course",
        image: resourceHacker,
        rating: 4.5,
        learners: "9k",
        lessons: 25,
    },
];

const ExploreGrid = ({ filters }: ExploreGridProps) => {
    const { t } = useAppI18n();
    // For now, show all items. Filtering logic can be added later.
    const items = exploreItems;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {items.map((item) =>
                item.type === "Course" || item.type === "Textbook" ? (
                    <CourseCard key={item.id} item={item} />
                ) : (
                    <ResourceCard key={item.id} item={item} />
                )
            )}
        </div>
    );
};

const CourseCard = ({ item }: { item: ExploreItem }) => {
    const { t } = useAppI18n();
    return (
        <Link to={`/collection/${item.id}`} className="group h-full block">
            <div className="bg-white rounded-[20px] overflow-hidden hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] transition-all duration-300 p-3.5 h-[320px] flex flex-col shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                {/* Image Section - Inner Padded Rounded Rectangle */}
                <div className="h-[130px] overflow-hidden rounded-[16px] flex-shrink-0 mb-3">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1">
                    {/* Pill-shaped Type Badge */}
                    <span className="inline-block text-[13px] font-bold text-black bg-[#FFF1C7] border border-[#CC8545] rounded-full px-4 py-1 mb-3 self-start whitespace-nowrap">
                        {t(`contentTypes.${item.type.toLowerCase()}`) || item.type}
                    </span>

                    {/* Title */}
                    <h3 className="text-[17px] font-bold text-foreground leading-[1.3] mb-3">
                        {item.title}
                    </h3>

                    {/* Metadata Section - Pinned to bottom */}
                    <div className="mt-auto flex items-center gap-2 text-[13px] text-muted-foreground font-semibold pt-2">
                        <span className="flex items-center gap-1">
                            {item.rating || "4.5"}
                            <FiStar className="w-3.5 h-3.5 text-[#A85236] fill-[#A85236]" />
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>{item.learners || "9k"} {t("contentStats.learners")}</span>
                        <span className="text-gray-300">•</span>
                        <span>{item.lessons || "25"} {t("contentStats.lessons")}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const ResourceCard = ({ item }: { item: ExploreItem }) => {
    const { t } = useAppI18n();

    const getCTAText = (type: string) => {
        switch (type.toLowerCase()) {
            case 'video': return t("resource.viewVideo") || "Watch the Video";
            case 'pdf': return t("resource.viewPdf") || "View the PDF";
            case 'epub': return t("resource.readEpub") || "View the Epub";
            default: return t("resource.view") || "View Resource";
        }
    };

    return (
        <Link
            to={`/collection/${item.id}`}
            className="relative block w-full h-[320px] rounded-[20px] overflow-hidden"
        >
            {/* Full Card Background Image */}
            <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-105 transition-none"
            />

            {/* Content Overlay */}
            <div className="relative z-10 p-7 flex flex-col h-full items-start">
                {/* Rectangular White Tag (Top-left) */}
                <span className="inline-block bg-white text-foreground text-[14px] px-4 py-1.5 rounded-[4px] shadow-sm mb-auto">
                    {t(`contentTypes.${item.type.toLowerCase()}`) || item.type}
                </span>

                {/* Bottom Content Overlay (Bottom-left) */}
                <div className="w-full mt-auto">
                    <h3
                        className="text-white text-[20px] leading-[1.3] mb-3 font-normal"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        {item.title}
                    </h3>
                    <p
                        className="text-white text-[14px] flex items-center gap-2 font-normal"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                    >
                        {getCTAText(item.type)}
                        <FiArrowRight className="w-4 h-4" />
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ExploreGrid;
