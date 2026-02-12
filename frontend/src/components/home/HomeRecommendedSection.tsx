import { useNavigate, Link } from "react-router-dom";
import { FiArrowRight, FiStar } from "react-icons/fi";

const recommendedItems = [
    {
        id: "1",
        type: "Course",
        title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
        rating: 4.5,
        learners: "9k",
        lessons: 25,
        isVideo: false,
    },
    {
        id: "2",
        type: "Video",
        title: "Generative AI for Cybersecurity Professionals",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
        rating: null,
        learners: null,
        lessons: null,
        isVideo: true,
    },
    {
        id: "3",
        type: "Textbook",
        title: "Data Engineering Foundations",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
        rating: 4.5,
        learners: "9k",
        lessons: 25,
        isVideo: false,
    },
];

const HomeRecommendedSection = () => {
    const navigate = useNavigate();

    return (
        <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-[20px] font-bold text-[#222222] font-['Rubik']">Recommended Contents</h3>
                <Link to="/explore" className="text-[#A85236] hover:text-[#8a4329] transition-colors">
                    <FiArrowRight className="w-5 h-5 stroke-[2.5px]" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedItems.map((item) => (
                    item.isVideo ? (
                        // Video Card
                        <Link
                            key={item.id}
                            to={`/course/${item.id}`}
                            className="group relative h-[360px] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all no-underline"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Dark Overlay - Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 p-6 flex flex-col justify-between">
                                {/* Badge */}
                                <div>
                                    <span className="inline-block px-3 py-1 bg-white rounded-[4px] text-xs font-bold text-[#222222] font-['Rubik']">
                                        {item.type}
                                    </span>
                                </div>

                                {/* Content */}
                                <div>
                                    <h4 className="text-[22px] font-bold text-white leading-tight mb-4 font-['Rubik']">
                                        {item.title}
                                    </h4>

                                    <div className="flex items-center gap-2 text-white text-[15px] font-bold group-hover:gap-3 transition-all font-['Rubik']">
                                        View The Video
                                        <FiArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        // Course/Textbook Card
                        <Link
                            key={item.id}
                            to={`/course/${item.id}`}
                            className="bg-white rounded-[24px] overflow-hidden shadow-[0px_2px_12px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all no-underline flex flex-col h-[360px]"
                        >
                            {/* Thumbnail Container */}
                            <div className="p-4 pb-0">
                                <div className="rounded-2xl overflow-hidden h-[190px] w-full">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 pt-5 flex-1 flex flex-col">
                                {/* Type Badge */}
                                <div className="mb-3">
                                    <span className="inline-block px-4 py-1.5 bg-[#FFF8DE] rounded-full text-xs font-bold text-[#222222] font-['Rubik'] border border-[#F0E6C5]">
                                        {item.type}
                                    </span>
                                </div>

                                <h4 className="text-[18px] font-bold text-[#222222] leading-[1.3] mb-auto font-['Rubik'] line-clamp-3">
                                    {item.title}
                                </h4>

                                {/* Stats */}
                                <div className="flex items-center gap-3 text-[13px] text-[#6B7280] font-medium font-['Rubik'] mt-4">
                                    {item.rating && (
                                        <div className="flex items-center gap-1 text-[#222222] font-bold">
                                            <span>{item.rating}</span>
                                            <FiStar className="w-3.5 h-3.5 fill-[#A85236] text-[#A85236]" />
                                        </div>
                                    )}

                                    {(item.rating && (item.learners || item.lessons)) && (
                                        <span className="text-[#D1D5DB]">•</span>
                                    )}

                                    {item.learners && (
                                        <span>{item.learners} Learners</span>
                                    )}

                                    {(item.learners && item.lessons) && (
                                        <span className="text-[#D1D5DB]">•</span>
                                    )}

                                    {item.lessons && (
                                        <span>{item.lessons} Lessons</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    )
                ))}
            </div>
        </section>
    );
};

export default HomeRecommendedSection;
