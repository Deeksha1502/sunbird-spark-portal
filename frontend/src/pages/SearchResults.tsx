import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ExploreFilters from "@/components/ExploreFilters";
import SearchResultsGrid from "@/components/SearchResultsGrid";
import { useAppI18n } from "@/hooks/useAppI18n";

import { FiChevronDown } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";

export interface FilterState {
  collections: string[];
  contentTypes: string[];
  categories: string[];
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { currentCode } = useAppI18n();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    collections: [],
    contentTypes: [],
    categories: [],
  });
  const [sortBy, setSortBy] = useState<any>({ lastUpdatedOn: "desc" });
  const [sortLabel, setSortLabel] = useState("Newest");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader message="Loading..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <h1
          className="text-xl md:text-[1.375rem] font-medium mb-8 text-foreground"
        >
          Search Results for "{query}"
        </h1>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <ExploreFilters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Content Grid */}
          <div className="flex-1">
            <div className="flex justify-end mb-4">
              <div className="flex items-center gap-3">
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
                            {sortLabel}
                            <FiChevronDown className="w-4 h-4 text-sunbird-brick" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px] bg-white z-50">
                        <DropdownMenuItem 
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => {
                                setSortBy({ lastUpdatedOn: "desc" });
                                setSortLabel("Newest");
                            }}
                        >
                            Newest
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => {
                                setSortBy({ lastUpdatedOn: "asc" });
                                setSortLabel("Oldest");
                            }}
                        >
                            Oldest
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <SearchResultsGrid filters={filters} query={query} sortBy={sortBy} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
