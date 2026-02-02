import { FiArrowRight, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { FilterState } from "@/pages/SearchResults";

// Import resource images
import resourceRobotHand from "@/assets/resource-robot-hand.png";
import resourceVR from "@/assets/resource-vr.png";
import resourceHardware from "@/assets/resource-hardware.png";
import resourceBitcoin from "@/assets/resource-bitcoin.png";
import resourceHacker from "@/assets/resource-hacker.png";
import resourceEthereum from "@/assets/resource-ethereum.png";

interface SearchResultsGridProps {
    filters: FilterState;
    query: string;
}

type ContentType = "Course" | "Textbook" | "Video" | "PDF" | "Epub";

interface SearchItem {
    id: string;
    title: string;
    type: ContentType;
    image: string;
    isResource?: boolean;
    rating?: number;
    learners?: string;
    lessons?: number;
}

const searchItems: SearchItem[] = [
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

const SearchResultsGrid = ({ filters, query }: SearchResultsGridProps) => {
    // Filter items based on query (simple filter for demo)
    const items = searchItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) || query === ""
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {items.length > 0 ? (
                items.map((item) =>
                    item.isResource ? (
                        <ResourceCard key={item.id} item={item} />
                    ) : (
                        <CourseCard key={item.id} item={item} />
                    )
                )
            ) : (
                <div className="col-span-full py-12 text-center">
                    <p
                        className="text-[16px]"
                        style={{ color: '#757575', fontFamily: 'Rubik, sans-serif' }}
                    >
                        No results found for "{query}"
                    </p>
                </div>
            )}
        </div>
    );
};

const CourseCard = ({ item }: { item: SearchItem }) => {
    return (
        <Link to={`/collection/${item.id}`} className="group h-full">
            <div
                className="bg-white rounded-[20px] overflow-hidden p-3 pb-4 h-full flex flex-col"
                style={{ boxShadow: '2px 2px 20px rgba(0, 0, 0, 0.09)' }}
            >
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
                    <span
                        className="inline-block text-xs font-medium rounded-full px-3 py-1 mb-2 self-start"
                        style={{
                            backgroundColor: '#FFF1C7',
                            color: '#1A1A1A',
                            border: '1.5px solid #CC8545'
                        }}
                    >
                        {item.type}
                    </span>

                    {/* Title */}
                    <h3
                        className="font-medium text-[20px] leading-snug mb-auto line-clamp-3"
                        style={{ color: '#222222', fontFamily: 'Rubik, sans-serif' }}
                    >
                        {item.title}
                    </h3>

                    {/* Stats */}
                    <div
                        className="flex items-center gap-2 text-[14px] mt-3"
                        style={{ color: '#757575', fontFamily: 'Rubik, sans-serif' }}
                    >
                        <span
                            className="flex items-center gap-1"
                            style={{ color: '#222222' }}
                        >
                            {item.rating}
                            <FiStar className="w-3.5 h-3.5 fill-[#B94A2C] text-[#B94A2C]" />
                        </span>
                        <span style={{ color: '#757575' }}>•</span>
                        <span>{item.learners} Learners</span>
                        <span style={{ color: '#757575' }}>•</span>
                        <span>{item.lessons} Lessons</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const ResourceCard = ({ item }: { item: SearchItem }) => {
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
            <div className="group rounded-[20px] overflow-hidden cursor-pointer h-full min-h-[300px]">
                <div className="relative h-full">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                        <span
                            className="inline-block text-xs font-medium px-3 py-1.5 rounded-full"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#1A1A1A' }}
                        >
                            {item.type}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
                        <h3
                            className="text-white font-medium text-[20px] leading-snug max-w-[90%]"
                            style={{ textShadow: "var(--shadow-on-image)", fontFamily: 'Rubik, sans-serif' }}
                        >
                            {item.title}
                        </h3>
                        <p
                            className="mt-2 text-white/90 text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-opacity"
                            style={{ textShadow: "var(--shadow-on-image-soft)", fontFamily: 'Rubik, sans-serif' }}
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

export default SearchResultsGrid;
