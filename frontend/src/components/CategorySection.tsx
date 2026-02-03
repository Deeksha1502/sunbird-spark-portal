import { FiArrowRight } from "react-icons/fi";
import { useAppI18n } from "@/hooks/useAppI18n";
import { Link } from "react-router-dom";
import uiuxIcon from "@/assets/icons/uiux-icon.png";
import devIcon from "@/assets/icons/dev-icon.png";
import marketingIcon from "@/assets/icons/marketing-icon.png";
import entrepreneurIcon from "@/assets/icons/entrepreneur-icon.png";
import browseAllIcon from "@/assets/icons/browse-all-icon.png";

const CategorySection = () => {
  const { t } = useAppI18n();

  const categories = [
    {
      id: "ui-ux-design",
      name: "ui-ux-design",
      icon: uiuxIcon,
      gradient: "linear-gradient(315deg, #45C0ED 0%, #8E46C5 100%)",
    },
    {
      id: "it-development",
      name: "it-development",
      icon: devIcon,
      gradient: "linear-gradient(315deg, #F6C35C 0%, #D55E1D 100%)",
    },
    {
      id: "digital-marketing",
      name: "digital-marketing",
      icon: marketingIcon,
      gradient: "linear-gradient(315deg, #6ED97B 0%, #1D79D5 100%)",
    },
    {
      id: "entrepreneurship",
      name: "entrepreneurship",
      icon: entrepreneurIcon,
      gradient: "linear-gradient(315deg, #F59C84 0%, #D655E7 100%)",
    },
  ];

  return (
    <section id="categories" className="py-6 md:py-8 bg-white">
      <div className="w-full" style={{ paddingLeft: '108px', paddingRight: '82px' }}>
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
                  className="flex flex-col justify-between transition-transform hover:scale-[1.02] p-5"
                  style={{
                    background: category.gradient,
                    width: '210px',
                    height: '166px',
                    borderRadius: '20px'
                  }}
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
            className="group flex flex-col items-center justify-center gap-3 self-center"
            style={{ paddingLeft: '70px', paddingTop: '24px' }}
          >
            <div
              className="rounded-full text-white flex items-center justify-center transition-transform hover:scale-105"
              style={{
                width: '59px',
                height: '59px',
                backgroundColor: '#A85236'
              }}
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
