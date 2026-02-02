import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import PageLoader from "@/components/PageLoader";
import Footer from "@/components/Footer";
import { useAppI18n } from "@/hooks/useAppI18n";
import HomeSidebar from "@/components/HomeSidebar";
import HomeRecommendedSection from "@/components/HomeRecommendedSection";
import MyLearningCourses from "@/components/MyLearningCourses"
import MyLearningHoursSpent from "@/components/MyLearningHoursSpent";
import MyLearningUpcomingClasses from "@/components/MyLearningUpcomingClasses";

// Custom language icon matching design
const LanguageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="2" y="16" fontSize="11" fontWeight="600" fill="currentColor">A</text>
        <text x="12" y="16" fontSize="9" fontWeight="500" fill="currentColor">あ</text>
    </svg>
);

const MyLearning = () => {
    const navigate = useNavigate();
    const { languages, currentCode, changeLanguage } = useAppI18n();
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeNav, setActiveNav] = useState("learning");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const currentLanguage = languages.find(l => l.code === currentCode) || languages[0];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const handleLanguageChange = (lang: any) => changeLanguage(lang.code);

    if (isLoading) {
        return <PageLoader message="Loading your learning..." />;
    }

    return (
        <div className="min-h-screen bg-home-ivory flex">
            {/* Sidebar */}
            {isSidebarOpen && (
                <HomeSidebar activeNav={activeNav} onNavChange={setActiveNav} />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left: Menu Toggle + Title */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="text-home-ginger hover:text-home-brick transition-colors p-1"
                            >
                                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M1 7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M1 13H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                            <h1 className="text-lg font-semibold text-gray-900 font-['Rubik']">My Learning</h1>
                        </div>

                        {/* Right: Search + Language */}
                        <div className="flex items-center gap-4">
                            {/* Search Bar */}
                            <div
                                className="relative w-80 cursor-pointer"
                                onClick={() => navigate('/search')}
                            >
                                <Input
                                    placeholder="Search for content"
                                    readOnly
                                    className="pl-4 pr-10 bg-white border-gray-200 focus:border-home-ginger focus:ring-home-ginger/20 rounded-lg h-10 font-['Rubik'] cursor-pointer"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-home-ginger hover:text-home-brick">
                                    <FiSearch className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Language Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-600 hover:text-home-ginger">
                                        <LanguageIcon />
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white border-gray-200">
                                    {languages.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang)}
                                            className={currentCode === lang.code ? "bg-home-ivory" : ""}
                                        >
                                            <span className="mr-2">{lang.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto bg-home-ivory">
                    <div className="p-6 md:p-8">
                        {/* Courses and Hours/Classes Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                            {/* Left Column - Courses (2 cols) */}
                            <div className="lg:col-span-2">
                                <MyLearningCourses />
                            </div>

                            {/* Right Column - Hours Spent + Upcoming Classes */}
                            <div className="space-y-5">
                                <MyLearningHoursSpent />
                                <MyLearningUpcomingClasses />
                            </div>
                        </div>

                        {/* Recommended Contents */}
                        <HomeRecommendedSection />
                    </div>

                    {/* Footer */}
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default MyLearning;
