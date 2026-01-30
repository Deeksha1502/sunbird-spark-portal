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
    // For now, show all items. Filtering logic can be added later.
    const items = exploreItems;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {items.map((item) =>
                item.isResource ? (
                    <ResourceCard key={item.id} item={item} />
                ) : (
                    <CourseCard key={item.id} item={item} />
                )
            )}
        </div>
    );
};

const CourseCard = ({ item }: { item: ExploreItem }) => {
    return (
        <Link to={`/collection/${item.id}`} className="group h-full">
            <div className="bg-white rounded-[16px] overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow p-3 pb-4 h-full flex flex-col">
                {/* Image - consistent 274x156 ratio with subtle rounded corners */}
                <div className="aspect-[274/156] overflow-hidden rounded-[12px] flex-shrink-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="pt-3 px-1 flex flex-col flex-1">
                    {/* Type Badge - cream background with golden border */}
                    <span className="inline-block text-xs font-medium text-foreground bg-[#FFF1C7] border border-[#CC8545] rounded-full px-3 py-1 mb-2 self-start">
                        {item.type}
                    </span>

                    {/* Title */}
                    <h3 className="text-[15px] font-semibold text-foreground leading-snug mb-auto line-clamp-2">
                        {item.title}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                        <span className="flex items-center gap-1">
                            {item.rating}
                            <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
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
};

const ResourceCard = ({ item }: { item: ExploreItem }) => {
    const getViewLabel = (type: ContentType) => {
        switch (type) {
            case "Video":
                return "Watch the Video";
            case "PDF":
                return "View The PDF";
            case "Epub":
                return "View the Epub";
            default:
                return "View";
        }
    };

    return (
        <Link to={`/collection/${item.id}`} className="block h-full">
            <div className="group rounded-[16px] overflow-hidden cursor-pointer h-full">
                <div className="relative h-full">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="inline-block bg-white/95 text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                            {item.type}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
                        <h3
                            className="text-white font-semibold text-lg leading-snug max-w-[90%]"
                            style={{ textShadow: "var(--shadow-on-image)" }}
                        >
                            {item.title}
                        </h3>
                        <p
                            className="mt-2 text-white/90 text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-opacity"
                            style={{ textShadow: "var(--shadow-on-image-soft)" }}
                        >
                            {getViewLabel(item.type)}
                            <FiArrowRight className="w-3.5 h-3.5" />
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ExploreGrid;
