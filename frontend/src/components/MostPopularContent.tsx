import { FiArrowRight, FiStar } from "react-icons/fi";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Link } from "react-router-dom";
import { useAppI18n } from "@/hooks/useAppI18n";

interface ContentCourse {
    id: string;
    title: string;
    image: string;
    type: "Course" | "Textbook" | "Skills";
    rating: number;
    learners: string;
    lessons: number;
}

const MostPopularContent = () => {
    const { t } = useAppI18n();

    const courses: ContentCourse[] = [
        {
            id: "1",
            title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
            type: "Course",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "2",
            title: "Data Engineering Foundations",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
            type: "Textbook",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "3",
            title: "Generative AI for Cybersecurity Professionals",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
            type: "Course",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "4",
            title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
            type: "Textbook",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "5",
            title: "Data Engineering Foundations",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
            type: "Skills",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "6",
            title: "Generative AI for Cybersecurity Professionals",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
            type: "Textbook",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
    ];

    const getBadgeStyle = () => {
        return {
            backgroundColor: "#FFF1C7",
            color: "#1A1A1A",
            border: "1.5px solid #CC8545"
        };
    };

    return (
        <section className="pt-6 pb-10 md:pt-8 md:pb-12 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <h2
                        className="text-lg md:text-xl font-bold"
                        style={{ color: '#1A1A1A', fontFamily: 'Rubik, sans-serif' }}
                    >
                        {t("popular.title")}
                    </h2>
                    <Link to="/explore">
                        <Button
                            variant="ghost"
                            className="p-0 h-auto hover:bg-transparent"
                            style={{ color: '#B94A2C' }}
                        >
                            <FiArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>

                {/* Course Cards - 3 column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {courses.map((course) => (
                        <Link key={course.id} to={`/collection/${course.id}`}>
                            <div
                                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                            >
                                {/* Image with padding */}
                                <div className="p-3 pb-0">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                            style={{ backgroundImage: `url(${course.image})` }}
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 pt-3">
                                    {/* Badge below image */}
                                    <Badge
                                        className="text-[11px] font-medium px-3 py-1 rounded-full mb-2.5"
                                        style={getBadgeStyle()}
                                    >
                                        {t(`contentTypes.${course.type.toLowerCase()}`) || course.type}
                                    </Badge>

                                    {/* Title */}
                                    <h3
                                        className="font-semibold text-[14px] leading-snug mb-2.5 line-clamp-2"
                                        style={{ color: '#1A1A1A', fontFamily: 'Rubik, sans-serif' }}
                                    >
                                        {course.title}
                                    </h3>

                                    {/* Stats */}
                                    <div
                                        className="flex items-center gap-1.5 text-[12px]"
                                        style={{ color: '#6B7280', fontFamily: 'Rubik, sans-serif' }}
                                    >
                                        <span
                                            className="font-medium"
                                            style={{ color: '#1A1A1A' }}
                                        >
                                            {course.rating.toFixed(1)}
                                        </span>
                                        <FiStar className="w-3.5 h-3.5 fill-[#B94A2C] text-[#B94A2C]" />
                                        <span className="mx-0.5">•</span>
                                        <span>{course.learners} {t("contentStats.learners")}</span>
                                        <span className="mx-0.5">•</span>
                                        <span>{course.lessons} {t("contentStats.lessons")}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MostPopularContent;
