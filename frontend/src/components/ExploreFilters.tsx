import { useState } from "react";
import { Checkbox } from "./checkbox";
import { useAppI18n } from "@/hooks/useAppI18n";
import type { FilterState } from "@/pages/Explore";

// Import collection icons
import filterCoursesIcon from "@/assets/filter-courses-icon.png";
import filterResourcesIcon from "@/assets/filter-resources-icon.png";
import filterTextbooksIcon from "@/assets/filter-textbooks-icon.png";
import filterSkillsIcon from "@/assets/filter-skills-icon.png";

interface ExploreFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const ExploreFilters = ({ filters, setFilters }: ExploreFiltersProps) => {
  const { t } = useAppI18n();
  const [showMoreContentTypes, setShowMoreContentTypes] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const collections = [
    { id: "courses", label: "Courses", icon: filterCoursesIcon },
    { id: "resources", label: "Resources", icon: filterResourcesIcon },
    { id: "textbooks", label: "Textbooks", icon: filterTextbooksIcon },
    { id: "skills", label: "Skills", icon: filterSkillsIcon },
  ];

  const contentTypes = [
    { id: "video", label: "Video" },
    { id: "audio", label: "Audio" },
    { id: "pdf", label: "PDF" },
    { id: "epub", label: "Epub" },
    { id: "youtube", label: "Youtube" },
    { id: "html", label: "HTML" },
    { id: "interactive", label: "Interactive" },
  ];

  const categories = [
    { id: "ai-ml", label: "AI/ML" },
    { id: "cyber-security", label: "Cyber Security" },
    { id: "ux-design", label: "UX Design" },
    { id: "devops", label: "DevOps" },
    { id: "data-science", label: "Data Science" },
    { id: "blockchain", label: "Blockchain" },
  ];

  const visibleContentTypes = showMoreContentTypes ? contentTypes : contentTypes.slice(0, 5);
  const visibleCategories = showMoreCategories ? categories : categories.slice(0, 4);

  const handleCheckboxChange = (
    category: keyof FilterState,
    id: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], id]
        : prev[category].filter((item) => item !== id),
    }));
  };

  return (
    <div className="bg-[#F5F5F5] rounded-2xl p-4">
      {/* Filters Title */}
      <h2 className="text-lg font-bold text-foreground mb-4 px-2">{t("filters")}</h2>

      {/* Collections Section */}
      <div className="bg-white rounded-xl p-4 mb-3">
        <h3 className="text-sm font-semibold text-foreground mb-4">{t("collections")}</h3>
        <div className="space-y-3">
          {collections.map((item) => (
            <label
              key={item.id}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={item.icon}
                  alt=""
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {t(`filterOptions.${item.id}`)}
                </span>
              </div>
              <Checkbox
                checked={filters.collections.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("collections", item.id, checked as boolean)
                }
                className="h-5 w-5 rounded border-[#CC8545] data-[state=checked]:bg-[#CC8545] data-[state=checked]:border-[#CC8545]"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Content Type Section */}
      <div className="bg-white rounded-xl p-4 mb-3">
        <h3 className="text-sm font-semibold text-foreground mb-4">{t("contentType")}</h3>
        <div className="space-y-3">
          {visibleContentTypes.map((item) => (
            <label
              key={item.id}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {t(`contentTypes.${item.id}`)}
              </span>
              <Checkbox
                checked={filters.contentTypes.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("contentTypes", item.id, checked as boolean)
                }
                className="h-5 w-5 rounded border-[#CC8545] data-[state=checked]:bg-[#CC8545] data-[state=checked]:border-[#CC8545]"
              />
            </label>
          ))}
        </div>
        {contentTypes.length > 5 && (
          <button
            onClick={() => setShowMoreContentTypes(!showMoreContentTypes)}
            className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {showMoreContentTypes ? t("viewLess") : t("viewMore")}
          </button>
        )}
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">{t("categories")}</h3>
        <div className="space-y-3">
          {visibleCategories.map((item) => (
            <label
              key={item.id}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {t(`categoriesList.${item.id}`)}
              </span>
              <Checkbox
                checked={filters.categories.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("categories", item.id, checked as boolean)
                }
                className="h-5 w-5 rounded border-[#CC8545] data-[state=checked]:bg-[#CC8545] data-[state=checked]:border-[#CC8545]"
              />
            </label>
          ))}
        </div>
        {categories.length > 4 && (
          <button
            onClick={() => setShowMoreCategories(!showMoreCategories)}
            className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {showMoreCategories ? t("viewLess") : t("viewMore")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ExploreFilters;
