import { FiStar, FiClock } from "react-icons/fi";
import { Badge } from "@/components/badge";
import { Card, CardContent } from "@/components/card";
import { DashboardCourse } from "@/types";

interface DashboardCourseCardProps {
    course: DashboardCourse;
    onClick: () => void;
}

const DashboardCourseCard = ({ course, onClick }: DashboardCourseCardProps) => {
    return (
        <Card
            onClick={onClick}
            className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 bg-card cursor-pointer h-full"
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden">
                <div
                    className="aspect-video bg-muted bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                        backgroundImage: `url(${course.thumbnail})`
                    }}
                />
                <Badge
                    variant="outline"
                    className="absolute top-3 end-3 bg-card/90 backdrop-blur-sm"
                >
                    {course.badges[0]}
                </Badge>
            </div>

            <CardContent className="p-4 md:p-5">
                {/* Language Badge */}
                <p className="text-xs font-medium text-primary mb-2">{course.badges[1]}</p>

                {/* Title */}
                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                </h3>

                {/* Author */}
                <p className="text-sm text-muted-foreground">by {course.author}</p>
                {/* Stats */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground" style={{ paddingTop: '45px' }}>
                    <div className="flex items-center gap-1">
                        <FiStar className="w-4 h-4 fill-secondary text-secondary" />
                        <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FiClock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DashboardCourseCard;
