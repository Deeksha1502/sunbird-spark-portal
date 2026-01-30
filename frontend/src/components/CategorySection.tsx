import { FiArrowRight } from "react-icons/fi";
import { useAppI18n } from "@/hooks/useAppI18n";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const { t } = useAppI18n();
  // Custom icons matching the reference design
  const UIUXIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 8h2v2H7zM7 12h4" />
    </svg>
  );

  const DevIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );

  const MarketingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );

  const EntrepreneurIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <path d="M16 8l2-2" />
      <path d="M8 8L6 6" />
    </svg>
  );

  const categories = [
    {
      id: "1",
      name: "UI/UX\nDesign",
      Icon: UIUXIcon,
      gradient: "linear-gradient(135deg, #7B68EE 0%, #5DADE2 100%)",
    },
    {
      id: "2",
      name: "IT\nDevelopment",
      Icon: DevIcon,
      gradient: "linear-gradient(135deg, #E67E22 0%, #F5B041 100%)",
    },
    {
      id: "3",
      name: "Digital\nMarketing",
      Icon: MarketingIcon,
      gradient: "linear-gradient(135deg, #1ABC9C 0%, #58D68D 100%)",
    },
    {
      id: "4",
      name: "Entrepreneurship",
      Icon: EntrepreneurIcon,
      gradient: "linear-gradient(135deg, #E880A0 0%, #D7A0E0 100%)",
    },
  ];

  return (
    <section id="categories" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header with inline arrow */}
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {t("browseCategories")}
          </h2>
          <Link
            to="/explore"
            className="text-primary hover:opacity-80 transition-opacity"
            aria-label="View all categories"
          >
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Category Cards + Browse All - Grid layout matching container width */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
          {categories.map((category) => (
            <Link key={category.id} to="/explore" className="group">
              <div
                className="w-full aspect-square rounded-2xl p-5 flex flex-col justify-between transition-transform hover:scale-[1.02]"
                style={{ background: category.gradient }}
              >
                {/* Top-left white horizontal line */}
                <div className="w-6 h-[2px] bg-white/80 rounded-full" />

                {/* Bottom content: Icon + Label */}
                <div className="flex flex-col gap-2">
                  <category.Icon />
                  <p className="text-[13px] md:text-[14px] font-medium text-white whitespace-pre-line leading-tight">
                    {category.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {/* Browse All Button - Same grid cell */}
          <Link to="/explore" className="group flex flex-col items-center justify-center gap-2">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-transform hover:scale-105">
              <FiArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {t("viewAll")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
