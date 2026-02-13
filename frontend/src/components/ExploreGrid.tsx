import { Link } from "react-router-dom";
import type { FilterState } from "@/pages/Explore";
import { useState, useEffect, useRef } from "react";
import { searchContent } from "@/api/content";
import type { Content } from "@/types/content";
import { useAppI18n } from "@/hooks/useAppI18n";
import EmptyState from "./EmptyState";
import { FiSearch } from "react-icons/fi";

interface ExploreGridProps {
    filters: FilterState;
    query?: string;
    sortBy?: any;
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

// Mock data removed - using API data only
const ExploreGrid = ({ filters, query = "", sortBy }: ExploreGridProps) => {
    // Initial state empty, no mock items
    const [displayItems, setDisplayItems] = useState<ExploreItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); 
    const [error, setError] = useState<string | null>(null);
    const observerTarget = useRef<HTMLDivElement>(null);
    const offsetRef = useRef(0); // Use ref for offset to avoid stale closures
    const isFetchingRef = useRef(false); // Prevent duplicate fetches
    const filtersRef = useRef(filters);
    const queryRef = useRef(query);
    const sortByRef = useRef(sortBy);
    const limit = 9; // Page size

    useEffect(() => {
        filtersRef.current = filters;
        queryRef.current = query;
        sortByRef.current = sortBy;
    }, [filters, query, sortBy]);

    const fetchContent = async () => {
        // Prevent duplicate fetches
        if (isFetchingRef.current || isLoading) {
            return;
        }

        try {
            isFetchingRef.current = true;
            setIsLoading(true);
            
            const currentOffset = offsetRef.current;
            const currentQuery = queryRef.current;
            const currentFilters = filtersRef.current;
            const currentSortBy = sortByRef.current;
            
            console.log(`Fetching ${limit} items at offset ${currentOffset} with query "${currentQuery}"`);
            
            // Construct filters object
            const activeFilters: any = {};
            if (currentFilters.collections.length > 0) {
                activeFilters.primaryCategory = currentFilters.collections;
            }
            // Add other filters logic if needed
            
            const data = await searchContent(limit, currentOffset, currentQuery, currentSortBy, activeFilters);
            const newContent = data.content || [];
            
            console.log(`Received ${newContent.length} items`);
            
            // Check if we have fewer items than requested (end of data)
            if (newContent.length < limit) {
                setHasMore(false);
            }

            const newItems: ExploreItem[] = newContent.map((content: Content, index: number) => {
                // Use static placeholder images if appIcon is missing
                const placeholderImages = [
                    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop",
                ];
                
                return {
                    id: content.identifier,
                    title: content.name,
                    type: (content.contentType as ContentType) || "Course",
                    image: content.appIcon || placeholderImages[index % placeholderImages.length] || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
                    rating: 4.5,
                    learners: "9k",
                    lessons: content.leafNodesCount || 10,
                };
            });

            setDisplayItems(prev => [...prev, ...newItems]);
            offsetRef.current = currentOffset + newContent.length; // Increment by actual items received
            setError(null);
        } catch (err) {
            console.error('Failed to fetch content:', err);
            setError('Failed to load courses');
            setHasMore(false);
        } finally {
            setIsLoading(false);
            isFetchingRef.current = false;
        }
    };

    // Initial load and query change reset
    useEffect(() => {
        offsetRef.current = 0;
        setDisplayItems([]);
        setHasMore(true);
        fetchContent();
    }, [query, filters, sortBy]); // Re-run when query changes

    // Infinite scroll observer
    useEffect(() => {
        if (!hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries && entries[0] && entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
                    fetchContent();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, isLoading, query, filters, sortBy]); // Only re-create observer when hasMore or isLoading changes
 

    return (
        <div className="flex flex-col pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {displayItems.map((item) =>
                    item.type === "Course" || item.type === "Textbook" ? (
                        <CourseCard key={item.id} item={item} />
                    ) : (
                        <ResourceCard key={item.id} item={item} />
                    )
                )}
                
                {!isLoading && displayItems.length === 0 && !error && (
                     <div className="col-span-full">
                        <EmptyState
                            title="No content found"
                            description=""
                            icon={FiSearch}
                        />
                    </div>
                )}
            </div>
            
            {/* Sentinel for infinite scroll */}
            <div ref={observerTarget} className="h-10 w-full flex items-center justify-center mt-6">
                 {isLoading && (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sunbird-brick"></div>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {!hasMore && !isLoading && displayItems.length > 0 && (
                    <p className="text-muted-foreground text-sm">No more content to show</p>
                )}
            </div>
        </div>
    );
};

const CourseCard = ({ item }: { item: ExploreItem }) => {
    const { t } = useAppI18n();
    return (
        <Link to={`/collection/${item.id}`} className="group block">
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-lg transition-all cursor-pointer h-[392px] flex flex-col">
                {/* Thumbnail */}
                <div className="p-4 pb-0">
                    <div className="rounded-2xl overflow-hidden h-[190px] w-full">

                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col relative">
                    {/* Type Badge */}
                    <div className="mb-3">
                        <span className="flex items-center justify-center text-[10px] font-bold w-[78px] h-[30px] rounded-[36px] bg-[#FFF1C7] border border-[#CC8545] text-[#222222]">
                            {t(`contentTypes.${item.type.toLowerCase()}`) || item.type}
                        </span>
                    </div>

                    <h4 className="font-[450] text-[#222222] text-[1rem] leading-tight line-clamp-3 mb-auto">
                        {item.title}
                    </h4>

                    {/* Stats */}
                    <div className="flex items-center gap-2 text-sm text-[#777777] mt-4 pb-5">
                        <span>{item.lessons || "25"} {t("contentStats.lessons")}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const ResourceCard = ({ item }: { item: ExploreItem }) => {
    return (
        <Link
            to={`/collection/${item.id}`}
            className="relative rounded-[20px] overflow-hidden cursor-pointer h-[392px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] group block"
        >
            {/* Background Image */}
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Badge */}
            <div className="absolute top-[2.75rem] left-[2.125rem] z-[5]">
                <span className="flex items-center justify-center bg-white text-black font-medium text-[1rem] px-3 h-[2.25rem] rounded-[0.25rem] shadow-sm tracking-wide">
                    {item.type}
                </span>
            </div>

            {/* Content Override - Title */}
             <div className="absolute inset-x-0 bottom-0 px-6 pb-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
                <h4 className="font-[450] text-white text-[1rem] leading-tight tracking-tight text-shadow-card">
                    {item.title}
                </h4>
            </div>
        </Link>
    );
};

export default ExploreGrid;
