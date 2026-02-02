import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ExploreFilters from "@/components/ExploreFilters";
import SearchResultsGrid from "@/components/SearchResultsGrid";
import { useAppI18n } from "@/hooks/useAppI18n";

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
          className="text-[20px] md:text-[22px] font-medium mb-8"
          style={{ color: '#222222', fontFamily: 'Rubik, sans-serif' }}
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
            <SearchResultsGrid filters={filters} query={query} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
