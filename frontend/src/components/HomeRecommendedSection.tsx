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
        <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-medium text-gray-900">Recommended Contents</h3>
                <Link to="/explore" className="text-sunbird-brick hover:text-sunbird-brick/90 transition-colors">
                    <FiArrowRight className="w-5 h-5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
                {recommendedItems.map((item) => (
                    item.isVideo ? (
                        // Video Card - Full dark background
                        <div
                            key={item.id}
                            onClick={() => navigate(`/course/${item.id}`)}
                            className="relative rounded-2xl overflow-hidden cursor-pointer h-full"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover absolute inset-0"
                            />
                            <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-5">
                                {/* Badge at top center */}
                                <div className="flex justify-center">
                                    <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-white border border-gray-200 text-black">
                                        {item.type}
                                    </span>
                                </div>

                                {/* Content at bottom */}
                                <div>
                                    <h4 className="font-semibold text-white text-xl leading-tight mb-3">
                                        {item.title}
                                    </h4>

                                    <button className="flex items-center gap-2 text-white text-sm font-medium hover:underline">
                                        View The Video
                                        <FiArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Course/Textbook Card - White background
                        <div
                            key={item.id}
                            onClick={() => navigate(`/course/${item.id}`)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
                        >
                            {/* Thumbnail */}
                            <div className="p-3 pb-0">
                                <div className="rounded-xl overflow-hidden aspect-[4/3]">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 pt-3 flex-1 flex flex-col">
                                {/* Type Badge */}
                                <span className="inline-block w-fit mb-3 text-sm font-medium px-4 py-1.5 rounded-full bg-sunbird-ivory border border-sunbird-ginger text-black">
                                    {item.type}
                                </span>

                                <h4 className="font-semibold text-gray-900 text-base leading-snug mb-3 line-clamp-2 flex-1">
                                    {item.title}
                                </h4>

                                {/* Stats */}
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    {item.rating && (
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium text-gray-700">{item.rating}</span>
                                            <FiStar className="w-4 h-4 fill-sunbird-brick text-sunbird-brick" />
                                        </div>
                                    )}
                                    {item.learners && (
                                        <>
                                            <span className="text-gray-400">•</span>
                                            <span>{item.learners} Learners</span>
                                        </>
                                    )}
                                    {item.lessons && (
                                        <>
                                            <span className="text-gray-400">•</span>
                                            <span>{item.lessons} Lessons</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export default HomeRecommendedSection;
