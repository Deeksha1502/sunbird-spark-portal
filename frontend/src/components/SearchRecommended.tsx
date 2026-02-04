import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";



interface ContentCourse {
    id: string;
    title: string;
    image: string;
    type: "Course" | "Textbook" | "Course";
    rating: number;
    learners: string;
    lessons: number;
}

const SearchRecommended = () => {
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
    ];

    const getBadgeStyle = (type: string) => {
        return "bg-sunbird-ivory text-foreground border-[1.5px] border-sunbird-ginger";
    };

    return (
        <section className="mb-8">
            {/* Header */}
            <h2
                className="text-xl font-semibold mb-6 text-foreground"
            >
                Recommended
            </h2>

            {/* Course Cards - 3 column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses.map((course) => (
                    <Link key={course.id} to={`/collection/${course.id}`} className="flex justify-center">
                        <div
                            className="group bg-white rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-lg shadow-[2px_2px_20px_0px_rgba(0,0,0,0.09)] w-[370px] h-[392px] flex flex-col"
                        >
                            {/* Image with padding */}
                            <div className="p-3 pb-0">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[16px]">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${course.image})` }}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 pt-3">
                                {/* Badge below image */}
                                <span
                                    className={`inline-block text-[0.6875rem] font-medium px-3 py-1 rounded-full mb-2.5 ${getBadgeStyle(course.type)}`}
                                >
                                    {course.type}
                                </span>

                                {/* Title */}
                                <h3
                                    className="font-semibold text-sm leading-snug mb-2.5 line-clamp-2 text-foreground"
                                >
                                    {course.title}
                                </h3>

                                {/* Stats */}
                                <div
                                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                                >
                                    <span
                                        className="font-medium text-foreground"
                                    >
                                        {course.rating.toFixed(1)}
                                    </span>
                                    <FiStar className="w-3.5 h-3.5 fill-sunbird-brick text-sunbird-brick" />
                                    <span className="mx-0.5">•</span>
                                    <span>{course.learners} Learners</span>
                                    <span className="mx-0.5">•</span>
                                    <span>{course.lessons} Lessons</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default SearchRecommended;
