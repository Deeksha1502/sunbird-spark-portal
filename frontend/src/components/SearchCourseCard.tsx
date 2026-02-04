import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SearchItem } from "@/types";

const SearchCourseCard = ({ item }: { item: SearchItem }) => {
    return (
        <Link to={`/collection/${item.id}`} className="group h-full">
            <div
                className="bg-white rounded-[20px] overflow-hidden p-3 pb-4 h-full flex flex-col shadow-[2px_2px_20px_rgba(0,0,0,0.09)]"
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
                        className="inline-block text-xs font-medium rounded-full px-3 py-1 mb-2 self-start bg-sunbird-ivory text-foreground border-[1.5px] border-sunbird-ginger"
                    >
                        {item.type}
                    </span>

                    {/* Title */}
                    <h3
                        className="font-medium text-xl leading-snug mb-auto line-clamp-3 text-foreground"
                    >
                        {item.title}
                    </h3>

                    {/* Stats */}
                    <div
                        className="flex items-center gap-2 text-sm mt-3 text-muted-foreground"
                    >
                        <span
                            className="flex items-center gap-1 text-foreground"
                        >
                            {item.rating}
                            <FiStar className="w-3.5 h-3.5 fill-sunbird-brick text-sunbird-brick" />
                        </span>
                        <span className="text-gray-500">•</span>
                        <span>{item.learners} Learners</span>
                        <span className="text-gray-500">•</span>
                        <span>{item.lessons} Lessons</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SearchCourseCard;
