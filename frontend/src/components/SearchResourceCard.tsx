import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SearchItem, ContentType } from "@/types";

const SearchResourceCard = ({ item }: { item: SearchItem }) => {
    // TODO: getViewLabel to be replaced with dynamic description
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

    // TODO: Link to be replaced with dynamic link
    return (
        <Link to={`/collection/${item.id}`} className="block h-full">
            <div className="group rounded-[20px] overflow-hidden cursor-pointer h-full min-h-[18.75rem]">
                <div className="relative h-full">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Type Badge */}
                    <div className="absolute top-[2.75rem] left-[2.125rem] z-[5]">
                        <span className="flex items-center justify-center bg-white text-black font-medium text-[1rem] px-3 h-[2.25rem] rounded-[0.25rem] shadow-sm tracking-wide">
                            {item.type}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
                        <h3
                            className="text-white font-[450] text-[1rem] leading-snug max-w-[90%] text-shadow-card"
                        >
                            {item.title}
                        </h3>
                        <p
                            className="text-white/90 text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-opacity text-shadow-card-sm"
                            style={{ paddingTop: '45px' }}
                        >
                            {getViewLabel(item.type as ContentType)}
                            <FiArrowRight className="w-3.5 h-3.5" />
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SearchResourceCard;
