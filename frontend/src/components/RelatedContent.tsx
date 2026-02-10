
import { Link } from "react-router-dom";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { RelatedItem } from "@/data/collectionData";
// import { useAppI18n } from "@/hooks/useAppI18n";


export const RelatedCourseCard = ({ item }: { item: RelatedItem }) => {
    // const { t } = useAppI18n();
    return (
        <Link to={`/collection/${item.id}`} className="group h-full">
            <div className="bg-white rounded-[16px] overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow p-3 pb-4 h-full flex flex-col">
                <div className="aspect-[274/156] overflow-hidden rounded-[12px] flex-shrink-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <span className="inline-block text-xs font-medium text-foreground bg-[#FFF1C7] border border-[#CC8545] rounded-full px-3 py-1 mb-2">
                        {item.type}
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
                        <span>{item.learners} Learners</span>
                        <span className="text-gray-300">•</span>
                        <span>{item.lessons} Lessons</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export const RelatedResourceCard = ({ item }: { item: RelatedItem }) => {
    // const { t } = useAppI18n();

    return (
        <Link to={`/collection/${item.id}`} className="block h-full">
            <div className="group rounded-[16px] overflow-hidden cursor-pointer  w-full max-w-[380px] h-[320px] md:h-[340px]">
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
                            {item.type}
                            <FiArrowRight className="w-3.5 h-3.5" />
                        </p>
                    </div>
                </div>
            </div>

        </Link>
    );
}