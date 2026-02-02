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
        return {
            backgroundColor: "#FFF1C7",
            color: "#1A1A1A",
            border: "1.5px solid #CC8545"
        };
    };

    return (
        <section className="mb-8">
            {/* Header */}
            <h2
                className="text-[20px] font-semibold mb-6"
                style={{ color: '#222222', fontFamily: 'Rubik, sans-serif' }}
            >
                Recommended
            </h2>

            {/* Course Cards - 3 column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses.map((course) => (
                    <Link key={course.id} to={`/collection/${course.id}`}>
                        <div
                            className="group bg-white rounded-[24px] overflow-hidden transition-all duration-300 hover:shadow-lg"
                            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
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
                                    className="inline-block text-[11px] font-medium px-3 py-1 rounded-full mb-2.5"
                                    style={getBadgeStyle(course.type)}
                                >
                                    {course.type}
                                </span>

                                {/* Title */}
                                <h3
                                    className="font-semibold text-[14px] leading-snug mb-2.5 line-clamp-2"
                                    style={{ color: '#222222', fontFamily: 'Rubik, sans-serif' }}
                                >
                                    {course.title}
                                </h3>

                                {/* Stats */}
                                <div
                                    className="flex items-center gap-1.5 text-[12px]"
                                    style={{ color: '#757575', fontFamily: 'Rubik, sans-serif' }}
                                >
                                    <span
                                        className="font-medium"
                                        style={{ color: '#222222' }}
                                    >
                                        {course.rating.toFixed(1)}
                                    </span>
                                    <FiStar className="w-3.5 h-3.5 fill-[#B94A2C] text-[#B94A2C]" />
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
