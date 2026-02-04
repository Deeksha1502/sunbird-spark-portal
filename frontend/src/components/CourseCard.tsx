import { FiStar } from "react-icons/fi";
import { Badge } from "@/components/badge";
import { useAppI18n } from "@/hooks/useAppI18n";

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  duration: string;
  lessons: number;
  enrolledCount: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  isFeatured?: boolean;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { t } = useAppI18n();

  return (
    <div className="group h-full block">
      <div className="bg-white rounded-[16px] overflow-hidden hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] transition-all duration-300 p-4 h-full flex flex-col shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        {/* Thumbnail */}
        <div className="h-[180px] overflow-hidden rounded-[12px] flex-shrink-0 relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover object-center"
          />
          {course.isFeatured && (
            <Badge className="absolute top-2 start-2 bg-secondary text-secondary-foreground text-[10px] px-2 py-0">
              {t("featured")}
            </Badge>
          )}
        </div>

        <div className="pt-4 flex flex-col flex-1">
          {/* Category Badge */}
          <span className="inline-block text-[13px] font-medium text-foreground bg-[#FFF1C7] border border-[#CC8545] rounded-full px-3 py-1 mb-3 self-start">
            {course.category}
          </span>

          {/* Title */}
          <h3 className="text-[18px] font-bold text-foreground leading-[1.3] line-clamp-2">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-[13px] text-muted-foreground mb-4">{t("by")} {course.instructor}</p>

          {/* Metadata Section - Pinned to bottom */}
          <div
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
            style={{ paddingTop: '45px' }}
          >
            <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
            <FiStar className="w-3.5 h-3.5 text-sunbird-brick fill-sunbird-brick" />
            <span className="mx-0.5">•</span>
            <span>{course.enrolledCount.toLocaleString()} {t("students")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
