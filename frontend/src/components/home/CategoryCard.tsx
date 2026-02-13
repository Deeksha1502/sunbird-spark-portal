import { IconType } from "react-icons";
import { Card } from "@/components/common/Card";
import { useAppI18n } from "@/hooks/useAppI18n";

export interface Category {
  id: string;
  name: string;
  icon: IconType;
  courseCount: number;
  color: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = category.icon;
  const { t } = useAppI18n();

  const getColorClass = (color: string) => {
    // Map legacy hex to new palette classes
    // This is a heuristic map
    if (color === "#024F9D") return { text: "text-sunbird-ink", bg: "bg-sunbird-ink/20" };
    if (color === "#16A34A") return { text: "text-sunbird-leaf", bg: "bg-sunbird-leaf/20" };
    if (color === "#DC2626") return { text: "text-sunbird-brick", bg: "bg-sunbird-brick/20" };
    if (color === "#7C3AED") return { text: "text-sunbird-lavender", bg: "bg-sunbird-lavender/20" };
    if (color === "#0891B2") return { text: "text-sunbird-wave", bg: "bg-sunbird-wave/20" };
    if (color === "#EA580C") return { text: "text-sunbird-ginger", bg: "bg-sunbird-ginger/20" };
    if (color === "#BE185D") return { text: "text-sunbird-jamun", bg: "bg-sunbird-jamun/20" };
    if (color === "#4F46E5") return { text: "text-sunbird-ink", bg: "bg-sunbird-ink/20" }; // Duplicate mapping

    // Fallback
    return { text: "text-sunbird-ink", bg: "bg-sunbird-ink/20" };
  };

  const { text, bg } = getColorClass(category.color);

  return (
    <Card className="group cursor-pointer overflow-hidden border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 bg-card">
      <div className="p-6 flex flex-col items-center text-center">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${bg}`}
        >
          <Icon
            className={`w-7 h-7 transition-colors ${text}`}
          />
        </div>
        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {category.courseCount} {t("coursesCount")}
        </p>
      </div>
    </Card>
  );
};

export default CategoryCard;
