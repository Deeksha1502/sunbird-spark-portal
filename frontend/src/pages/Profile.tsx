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
import ProfileCard from "@/components/ProfileCard"
import PersonalInformation from "@/components/PersonalInformation"
import ProfileLearningList from "@/components/ProfileLearningList"
import ProfileStatsCards from "@/components/ProfileStatsCards";

// Custom language icon matching design
const LanguageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="2" y="16" fontSize="11" fontWeight="600" fill="currentColor">A</text>
        <text x="12" y="16" fontSize="9" fontWeight="500" fill="currentColor">あ</text>
    </svg>
);

const Profile = () => {
    const navigate = useNavigate();
    const { languages, currentCode, changeLanguage } = useAppI18n();
    const [isLoading, setIsLoading] = useState(true);
    const [activeNav, setActiveNav] = useState("profile");

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const handleLanguageChange = (lang: any) => changeLanguage(lang.code);

    if (isLoading) {
        return <PageLoader message="Loading your profile..." />;
    }

    return (
        <div className="min-h-screen bg-[#F4F4F4] flex">
            {/* Sidebar */}
            <HomeSidebar activeNav={activeNav} onNavChange={setActiveNav} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 px-6 py-4 shadow-[0_14px_14px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between">
                        {/* Left: Back Arrow + Menu Toggle + Title */}
                        <div className="flex items-center gap-3">
                            {/* Back Arrow */}
                            <button
                                onClick={() => window.history.back()}
                                className="text-[#A14F34] hover:text-[#8a4329] transition-colors p-1"
                            >
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <h1 className="text-[20px] font-medium text-[#222222] font-['Rubik']">Profile</h1>
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
                                    className="pl-4 pr-10 bg-white border-[#E1E1E1] focus:border-home-ginger focus:ring-home-ginger/20 rounded-[9px] h-[46px] font-['Rubik'] text-[16px] cursor-pointer"
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
                <main className="flex-1 overflow-y-auto bg-[#F4F4F4]">
                    <div className="p-6 md:p-8">
                        {/* Top Section: Profile Card + Personal Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-[373px_1fr] gap-5 mb-8">
                            {/* Left: Profile Card */}
                            <ProfileCard />

                            {/* Right: Personal Information */}
                            <PersonalInformation />
                        </div>

                        {/* Stats Cards Section */}
                        <ProfileStatsCards />

                        {/* My Learning Section */}
                        <ProfileLearningList />
                    </div>

                    {/* Footer */}
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default Profile;
