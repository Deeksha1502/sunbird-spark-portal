import { FiPlay, FiStar, FiUsers, FiClock, FiBookOpen } from "react-icons/fi";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";

interface CourseHeaderProps {
    course: any;
    handleContinueLearning: () => void;
}

const CourseHeader = ({ course, handleContinueLearning }: CourseHeaderProps) => {
    return (
        <div>
            <div className="relative rounded-xl overflow-hidden mb-6">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Button
                    size="lg"
                    className="absolute bottom-6 left-6 gap-2 bg-primary hover:bg-primary/90"
                    onClick={handleContinueLearning}
                >
                    <FiPlay className="w-5 h-5" />
                    Continue Learning
                </Button>
            </div>

            <Badge variant="secondary" className="mb-3">
                {course.category}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {course.title}
            </h1>
            <p className="text-muted-foreground mb-4">
                Instructor: <span className="text-foreground">{course.instructor}</span>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-foreground font-medium">{course.rating}</span>
                    <span>({course.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                    <FiUsers className="w-4 h-4" />
                    {course.enrolledCount.toLocaleString()} enrolled
                </div>
                <div className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {course.duration}
                </div>
                <div className="flex items-center gap-1">
                    <FiBookOpen className="w-4 h-4" />
                    {course.lessons} lessons
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;
