import type { FilterState } from "@/pages/SearchResults";
import { SearchItem } from "@/types";
import SearchCourseCard from "./SearchCourseCard";
import SearchResourceCard from "./SearchResourceCard";

// Import resource images
import resourceRobotHand from "@/assets/resource-robot-hand.svg";
import resourceVR from "@/assets/resource-vr.svg";
import resourceHardware from "@/assets/resource-hardware.svg";
import resourceBitcoin from "@/assets/resource-bitcoin.svg";
import resourceHacker from "@/assets/resource-hacker.svg";
import resourceEthereum from "@/assets/resource-ethereum.svg";

interface SearchResultsGridProps {
    filters: FilterState;
    query: string;
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
                        <SearchResourceCard key={item.id} item={item} />
                    ) : (
                        <SearchCourseCard key={item.id} item={item} />
                    )
                )
            ) : (
                <div className="col-span-full py-12 text-center">
                    <p
                        className="text-base text-muted-foreground"
                    >
                        No results found for "{query}"
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchResultsGrid;
