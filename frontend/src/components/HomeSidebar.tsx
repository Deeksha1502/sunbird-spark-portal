import { useNavigate } from "react-router-dom";
import { FiHome, FiBook, FiBell, FiUser } from "react-icons/fi";
import sunbirdLogo from "@/assets/sunbird-logo.png";

interface HomeSidebarProps {
    activeNav: string;
    onNavChange: (nav: string) => void;
}

// Custom Explore icon matching the design
const ExploreIcon = ({ className }: { className?: string }) => (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M11.1424 6.85705C13.0359 6.85705 14.5709 5.32205 14.5709 3.42852C14.5709 1.535 13.0359 0 11.1424 0C9.24887 0 7.71387 1.535 7.71387 3.42852C7.71387 5.32205 9.24887 6.85705 11.1424 6.85705Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M9.42844 3.42911C9.42844 2.48626 10.1956 1.71484 11.1427 1.71484C12.0898 1.71484 12.857 2.48626 12.857 3.42911H9.42844ZM5.99992 3.42911C5.99992 2.82911 6.10278 2.25484 6.2922 1.71484H0.857131C0.383738 1.71484 0 2.10055 0 2.57197C0 3.0434 0.383738 3.42911 0.857131 3.42911H5.99992ZM6.68819 6.0005C7.0859 6.6862 7.63875 7.27762 8.29874 7.71476H0.857131C0.383738 7.71476 0 7.32905 0 6.85763C0 6.38621 0.383738 6.0005 0.857131 6.0005H6.68819ZM0.857131 10.2862C0.383738 10.2862 0 10.6719 0 11.1433C0 11.6147 0.383738 12.0004 0.857131 12.0004H12.857C13.3301 12.0004 13.7141 11.6147 13.7141 11.1433C13.7141 10.6719 13.3301 10.2862 12.857 10.2862H0.857131Z" fill="currentColor" />
    </svg>
);

const navItems = [
    { id: "home", label: "Home", icon: FiHome, path: "/home" },
    { id: "learning", label: "My Learning", icon: FiBook, path: "/explore" },
    { id: "explore", label: "Explore", icon: ExploreIcon, path: "/explore", isCustomIcon: true },
    { id: "notifications", label: "Notifications", icon: FiBell, path: "/home" },
    { id: "profile", label: "Profile", icon: FiUser, path: "/home" },
];

const HomeSidebar = ({ activeNav, onNavChange }: HomeSidebarProps) => {
    const navigate = useNavigate();

    const handleNavClick = (item: typeof navItems[0]) => {
        onNavChange(item.id);
        if (item.path !== "/home") {
            navigate(item.path);
        }
    };

    return (
        <aside className="w-[180px] bg-white border-r border-gray-100 flex flex-col shrink-0">
            {/* Logo */}
            <div className="p-5 border-b border-gray-100">
                <img src={sunbirdLogo} alt="Sunbird" className="h-7 w-auto" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.id;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleNavClick(item)}
                                    className={`
                    w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors
                    ${isActive
                                            ? "text-home-ginger bg-home-ginger/5 border-l-3 border-home-ginger"
                                            : "text-gray-600 hover:text-home-ginger hover:bg-gray-50"
                                        }
                  `}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default HomeSidebar;
