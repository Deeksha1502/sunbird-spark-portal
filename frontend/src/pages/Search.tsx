import { useState, useEffect, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/input";
import PageLoader from "@/components/PageLoader";
import Footer from "@/components/Footer";
import CategorySection from "@/components/CategorySection";
import ResourceCenter from "@/components/ResourceCenter";
import PopularContent from "@/components/PopularContent";
import FAQSection from "@/components/FAQSection";
import SearchRecommended from "@/components/SearchRecommended";
import SearchMostPopular from "@/components/SearchMostPopular";
import { useAppI18n } from "@/hooks/useAppI18n";

const Search = () => {
    const navigate = useNavigate();
    const { currentCode } = useAppI18n();
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, []);

    // const handleLanguageChange = (lang: Language) => { setCurrentLang(lang.code); };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            navigate(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    if (isLoading) {
        return <PageLoader message="Loading..." />;
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-8 pb-8">
            <div className="container mx-auto px-4">
                {/* Search Popover Container */}
                <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden">
                    {/* Search Header */}
                    <div className="px-6 py-6 md:px-8 md:py-8">
                        <div className="flex items-center gap-4">
                            {/* Search Input */}
                            <div className="flex-1 relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.53333 14.0667C11.1416 14.0667 14.0667 11.1416 14.0667 7.53333C14.0667 3.92507 11.1416 1 7.53333 1C3.92507 1 1 3.92507 1 7.53333C1 11.1416 3.92507 14.0667 7.53333 14.0667Z" stroke="#A85236" strokeWidth="2" />
                                        <path d="M15.0012 15.0002L12.2012 12.2002" stroke="#A85236" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <Input
                                    type="text"
                                    placeholder="Search for courses, textbooks, resources..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full h-14 pl-12 pr-4 text-base border-gray-200 rounded-full focus:border-sunbird-brick focus:ring-sunbird-brick/20 bg-gray-50"
                                    autoFocus
                                />
                            </div>

                            {/* Cancel Button */}
                            <button
                                onClick={handleCancel}
                                className="text-sunbird-brick text-base font-medium hover:text-sunbird-brick/90 transition-colors whitespace-nowrap"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="px-6 pb-8 md:px-8 md:pb-10">
                        {/* Recommended Section */}
                        <SearchRecommended />

                        {/* Most Popular Content */}
                        <SearchMostPopular />
                    </div>
                </div>

                {/* Sections outside the popover */}
                <div className="mt-8">
                    {/* Browse Through Categories */}
                    <CategorySection />

                    {/* Resource Center */}
                    <ResourceCenter />

                    {/* Most Viewed & Trending Content */}
                    <PopularContent />

                    {/* FAQ Section */}
                    <FAQSection />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Search;
