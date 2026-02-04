import { FiArrowRight, FiStar } from "react-icons/fi";
import { Button } from "@/components/button";
import { Link } from "react-router-dom";



interface ContentCourse {
  id: string;
  title: string;
  image: string;
  type: "Course" | "Textbook" | "Skills";
  rating: number;
  learners: string;
  lessons: number;
}

const SearchMostPopular = () => {
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
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
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
    return "bg-sunbird-ivory text-foreground border-[1.5px] border-sunbird-ginger";
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2
          className="text-xl font-semibold text-foreground"
        >
          Most Popular Content
        </h2>
        <Link to="/explore">
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent text-sunbird-brick"
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
              className="group bg-white rounded-[24px] overflow-hidden transition-all duration-300 hover:shadow-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
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
                  className={`inline-block text-[0.6875rem] font-medium px-3 py-1 rounded-full mb-2.5 ${getBadgeStyle()}`}
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

export default SearchMostPopular;
