import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ExploreFilters from "@/components/ExploreFilters";
import ExploreGrid from "@/components/ExploreGrid";
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
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                    {t("Start Exploring") || "Start Exploring"}
                </h1>

                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-64 shrink-0">
                        <ExploreFilters filters={filters} setFilters={setFilters} />
                    </aside>

                    {/* Content Grid */}
                    <div className="flex-1">
                        <ExploreGrid filters={filters} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Explore;
