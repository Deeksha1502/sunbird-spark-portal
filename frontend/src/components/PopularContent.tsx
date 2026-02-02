import { FiArrowRight, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppI18n } from "@/hooks/useAppI18n";

interface ContentCourse {
    id: string;
    title: string;
    image: string;
    type: "Course" | "Textbook";
    rating: number;
    learners: string;
    lessons: number;
}

const PopularContent = () => {
    const { t } = useAppI18n();
    const mostViewedCourses: ContentCourse[] = [
        {
            id: "1",
            title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=280&fit=crop",
            type: "Course",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "2",
            title: "Data Engineering Foundations",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=280&fit=crop",
            type: "Textbook",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "3",
            title: "Generative AI for Cybersecurity Professionals",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=280&fit=crop",
            type: "Course",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
    ];

    const trendingCourses: ContentCourse[] = [
        {
            id: "4",
            title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=280&fit=crop",
            type: "Course",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "5",
            title: "Data Engineering Foundations",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=280&fit=crop",
            type: "Textbook",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
        {
            id: "6",
            title: "Generative AI for Cybersecurity Professionals",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=280&fit=crop",
            type: "Course",
            rating: 4.5,
            learners: "9k",
            lessons: 25,
        },
    ];

    const getBadgeStyles = () => {
        return {
            backgroundColor: "#FFF1C7",
            color: "#1A1A1A",
            border: "1.5px solid #CC8545"
        };
    };

    const CourseCard = ({ course }: { course: ContentCourse }) => (
        <Link to={`/collection/${course.id}`}>
            <div
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
                {/* Image with padding */}
                <div className="p-3 pb-0">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 pt-3">
                    {/* Badge below image */}
                    <div className="mb-2">
                        <span
                            className="inline-block text-[11px] font-medium px-3 py-1 rounded-full"
                            style={getBadgeStyles()}
                        >
                            {t(`contentTypes.${course.type.toLowerCase()}`) || course.type}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-[14px] leading-snug mb-2 text-foreground line-clamp-2">
                        {course.title}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                        <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
                        <FiStar className="w-3.5 h-3.5 fill-[#B94A2C] text-[#B94A2C]" />
                        <span className="mx-0.5">•</span>
                        <span>{course.learners} {t("contentStats.learners")}</span>
                        <span className="mx-0.5">•</span>
                        <span>{course.lessons} {t("contentStats.lessons")}</span>
                    </div>
                </div>
            </div>
        </Link>
    );

    const CourseGrid = ({ courses, title }: { courses: ContentCourse[]; title: string }) => (
        <div className="mb-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-lg md:text-xl font-medium text-foreground">
                    {title}
                </h2>
                <Link
                    to="/explore"
                    className="text-primary hover:opacity-80 transition-opacity"
                    aria-label={`View all ${title}`}
                >
                    <FiArrowRight className="w-5 h-5" />
                </Link>
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
                <CourseGrid courses={mostViewedCourses} title={t("trending.mostViewed")} />
                <CourseGrid courses={trendingCourses} title={t("trending.trending")} />
            </div>
        </section>
    );
};

export default PopularContent;
