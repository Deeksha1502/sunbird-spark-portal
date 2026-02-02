import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ExploreFilters from "@/components/ExploreFilters";
import ExploreGrid from "@/components/ExploreGrid";
import { FiChevronDown } from "react-icons/fi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { useAppI18n } from "@/hooks/useAppI18n";

export interface FilterState {
    collections: string[];
    contentTypes: string[];
    categories: string[];
}

const Explore = () => {
    const { t } = useAppI18n();
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        collections: [],
        contentTypes: [],
        categories: [],
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <PageLoader message={t("loading") || "Loading..."} />;
    }

    return (
        <div className="min-h-screen bg-[#F8F9FB] shadow-[inset_0px_10px_30px_rgba(0,0,0,0.02)]">
            <Header />
            <main className="w-full px-[30px] py-6 md:py-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-[350px] shrink-0">
                        <ExploreFilters filters={filters} setFilters={setFilters} />
                    </aside>

                    {/* Content Grid */}
                    <div className="flex-1">
                        <div>
                            <div className="bg-white rounded-[12px] px-4 mb-6 flex flex-row justify-between items-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#D7D7D7]" style={{ height: '60px' }}>
                                <h1 className="font-medium text-foreground" style={{ fontFamily: 'Rubik, sans-serif', fontSize: '20px', lineHeight: '26px', letterSpacing: '0%' }}>
                                    {t("startExploring")}
                                </h1>

                                <div className="flex items-center gap-3 mt-4 md:mt-0">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="8" y1="6" x2="21" y2="6"></line>
                                            <line x1="8" y1="12" x2="21" y2="12"></line>
                                            <line x1="8" y1="18" x2="21" y2="18"></line>
                                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                        </svg>
                                        <span className="text-sm font-medium">Sort By</span>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-normal text-foreground hover:bg-gray-50 transition-colors min-w-[120px] justify-between">
                                                Popular
                                                <FiChevronDown className="w-4 h-4 text-[#A85236]" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[140px] bg-white z-50">
                                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">Popular</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">Newest</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">Rating</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>

                        <div>
                            <ExploreGrid filters={filters} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div >
    );
};

export default Explore;
