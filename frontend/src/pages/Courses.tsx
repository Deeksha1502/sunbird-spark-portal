import { useState, useEffect, useMemo } from "react";
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import CourseCard from "@/components/CourseCard";
import { featuredCourses, popularCourses, categories } from "@/configs/mockData"
import { useAppI18n } from "@/hooks/useAppI18n";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/skeleton"

const allCourses = [...featuredCourses, ...popularCourses];

const CourseCardSkeleton = () => (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Skeleton className="w-full h-40" />
        <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-full" />
        </div>
    </div>
);

const Courses = () => {
    const { t } = useAppI18n();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedLevel, setSelectedLevel] = useState<string>("all");
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Initial page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Debounced search with loading state
    useEffect(() => {
        setIsSearching(true);
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setIsSearching(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredCourses = useMemo(() => {
        return allCourses.filter((course) => {
            const matchesSearch = course.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                course.instructor.toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
            const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
            return matchesSearch && matchesCategory && matchesLevel;
        });
    }, [debouncedSearch, selectedCategory, selectedLevel]);

    const levels = ["Beginner", "Intermediate", "Advanced"];

    if (isPageLoading) {
        return <PageLoader message={t("loading")} />;
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {t("courses")}
                    </h1>
                    <p className="text-muted-foreground">
                        {t("heroSubtitle")}
                    </p>
                </div>

                {/* Filters Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={t("searchPlaceholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/30 border-border"
                        />
                    </div>

                    {/* Category Filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 min-w-[160px] justify-between">
                                <FiFilter className="w-4 h-4" />
                                {selectedCategory === "all" ? t("allTypes") : selectedCategory}
                                <FiChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border w-48">
                            <DropdownMenuItem onClick={() => setSelectedCategory("all")}>
                                {t("allTypes")}
                            </DropdownMenuItem>
                            {categories.map((cat) => (
                                <DropdownMenuItem
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                >
                                    {cat.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Level Filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 min-w-[140px] justify-between">
                                {selectedLevel === "all" ? t("allTypes") : selectedLevel}
                                <FiChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                            <DropdownMenuItem onClick={() => setSelectedLevel("all")}>
                                {t("allTypes")}
                            </DropdownMenuItem>
                            {levels.map((level) => (
                                <DropdownMenuItem
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                >
                                    {level}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Results Count */}
                <p className="text-muted-foreground mb-6">
                    {isSearching ? t("loading") : `${t("viewAll")} ${filteredCourses.length} ${t("coursesCount")}`}
                </p>

                {/* Courses Grid */}
                {isSearching ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CourseCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCourses.map((course) => (
                            <Link key={course.id} to={`/course/${course.id}`}>
                                <CourseCard course={course} />
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isSearching && filteredCourses.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg">
                            {t("noContentFound")}
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                                setSelectedLevel("all");
                            }}
                        >
                            {t("cancel")}
                        </Button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Courses;