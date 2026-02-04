import { FiArrowRight } from "react-icons/fi";
import { useAppI18n } from "@/hooks/useAppI18n";
import { Link } from "react-router-dom";
import uiuxIcon from "@/assets/icons/uiux-icon.svg";
import devIcon from "@/assets/icons/dev-icon.svg";
import marketingIcon from "@/assets/icons/marketing-icon.svg";
import entrepreneurIcon from "@/assets/icons/entrepreneur-icon.svg";
import browseAllIcon from "@/assets/icons/browse-all-icon.svg";

const CategorySection = () => {
  const { t } = useAppI18n();

  const categories = [
    {
      id: "ui-ux-design",
      name: "ui-ux-design",
      icon: uiuxIcon,
      gradientClass: "bg-gradient-to-tl from-sunbird-wave to-sunbird-lavender",
    },
    {
      id: "it-development",
      name: "it-development",
      icon: devIcon,
      gradientClass: "bg-gradient-to-tl from-sunbird-sunflower to-sunbird-ginger",
    },
    {
      id: "digital-marketing",
      name: "digital-marketing",
      icon: marketingIcon,
      gradientClass: "bg-gradient-to-tl from-sunbird-leaf to-sunbird-ink",
    },
    {
      id: "entrepreneurship",
      name: "entrepreneurship",
      icon: entrepreneurIcon,
      gradientClass: "bg-gradient-to-tl from-sunbird-ginger to-sunbird-jamun",
    },
  ];

  return (
    <section id="categories" className="py-6 md:py-8 bg-white">
      <div className="w-full pl-[108px] pr-[82px]">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium text-foreground">
            {t("browseCategories")}
          </h2>
        </div>

        {/* Category Cards and Browse All */}
        <div className="flex items-start gap-5">
          {/* Category Cards */}
          <div className="flex gap-5">
            {categories.map((category) => (
              <Link key={category.id} to="/explore" className="group">
                <div
                  className={`flex flex-col justify-between transition-transform hover:scale-[1.02] p-5 w-[210px] h-[166px] rounded-[20px] ${category.gradientClass}`}
                >
                  {/* Top-left white horizontal line */}
                  <div className="w-6 h-[2px] bg-white/80 rounded-full" />

                  {/* Bottom content: Icon + Label */}
                  <div className="flex flex-col gap-2">
                    <img src={category.icon} alt={category.name} className="w-6 h-6" />
                    <p className="text-[14px] font-medium text-white whitespace-pre-line leading-tight">
                      {t(`categoriesList.${category.id}`)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Browse All Button - Aligned to the right */}
          <Link
            to="/explore"
            className="group flex flex-col items-center justify-center gap-3 self-center pl-[70px] pt-[24px]"
          >
            <div
              className="rounded-full text-white flex items-center justify-center transition-transform hover:scale-105 w-[59px] h-[59px] bg-sunbird-brick"
            >
              <FiArrowRight className="w-6 h-6" />
            </div>
            <span className="text-[14px] font-bold text-foreground">
              {t("viewAll")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
