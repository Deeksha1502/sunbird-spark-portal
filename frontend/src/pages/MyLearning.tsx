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

import sunbirdLogo from "@/assets/sunbird-logo.svg";
import translationIcon from "@/assets/translation_icon.svg";

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
        <div className="min-h-screen bg-home-ivory flex flex-col">
            {/* Top Header */}
            <header className="bg-white border-b border-gray-100 px-6 py-4 shadow-[0_14px_14px_rgba(0,0,0,0.05)] z-10 sticky top-0" style={{ paddingRight: '100px' }}>
                <div className="flex items-center justify-between">
                    {/* Left: Sunbird Logo + Align with Sidebar */}
                    <div className="flex items-center" style={{ width: isSidebarOpen ? '156px' : 'auto' }}>
                        {isSidebarOpen ? (
                            <img src={sunbirdLogo} alt="Sunbird" className="h-7 w-auto" />
                        ) : (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="text-sunbird-brick hover:text-sunbird-brick/90 transition-colors p-1"
                            >
                                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M1 7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M1 13H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        )}
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
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.53333 14.0667C11.1416 14.0667 14.0667 11.1416 14.0667 7.53333C14.0667 3.92507 11.1416 1 7.53333 1C3.92507 1 1 3.92507 1 7.53333C1 11.1416 3.92507 14.0667 7.53333 14.0667Z" stroke="#A85236" strokeWidth="2" />
                                    <path d="M15.0012 15.0002L12.2012 12.2002" stroke="#A85236" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Language Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-1 text-sunbird-brick hover:bg-gray-50">
                                    <img src={translationIcon} alt="Language" className="w-5 h-5" />
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

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="relative shrink-0">
                    {isSidebarOpen && (
                        <>
                            <HomeSidebar activeNav={activeNav} onNavChange={setActiveNav} />
                            <div className="absolute -right-3 top-2 z-20">
                                <button className="w-6 h-6 bg-[#EFEFEF] flex items-center justify-center shadow-sm text-[#A85236] hover:opacity-80 transition-opacity">
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-home-ivory relative">
                    <div className="p-6 md:p-8" style={{ paddingRight: '100px', paddingLeft: '26px' }}>
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
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MyLearning;
