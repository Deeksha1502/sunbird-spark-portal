import { FiSearch, FiGrid, FiList, FiFilter } from "react-icons/fi";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/select";
import { cn } from "@/lib/utils";
import { useAppI18n } from "@/hooks/useAppI18n";

export type ViewMode = 'grid' | 'list';
export type SortOption = 'updated' | 'created' | 'title';
export type ContentTypeFilter = 'all' | 'course' | 'content' | 'quiz' | 'collection';

interface WorkspaceHeaderProps {
    title: string;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    sortBy: SortOption;
    onSortChange: (sort: SortOption) => void;
    typeFilter: ContentTypeFilter;
    onTypeFilterChange: (type: ContentTypeFilter) => void;
    showFilters?: boolean;
}

const WorkspaceHeader = ({
    title,
    searchQuery,
    onSearchChange,
    viewMode,
    onViewModeChange,
    sortBy,
    onSortChange,
    typeFilter,
    onTypeFilterChange,
    showFilters = true,
}: WorkspaceHeaderProps) => {
    const { t } = useAppI18n();

    return (
        <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>

                {showFilters && (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-muted rounded-lg p-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("h-8 w-8 rounded-md", viewMode === 'grid' && "bg-card shadow-sm")}
                                onClick={() => onViewModeChange('grid')}
                            >
                                <FiGrid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("h-8 w-8 rounded-md", viewMode === 'list' && "bg-card shadow-sm")}
                                onClick={() => onViewModeChange('list')}
                            >
                                <FiList className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {showFilters && (
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 max-w-md">
                        <FiSearch className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={t('searchContent')}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="ps-10 bg-card border-border"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Select value={typeFilter} onValueChange={(v) => onTypeFilterChange(v as ContentTypeFilter)}>
                            <SelectTrigger className="w-[140px] bg-card border-border">
                                <FiFilter className="w-4 h-4 me-2 text-muted-foreground" />
                                <SelectValue placeholder={t('allTypes')} />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border z-50">
                                <SelectItem value="all">{t('allTypes')}</SelectItem>
                                <SelectItem value="course">{t('course')}</SelectItem>
                                <SelectItem value="content">{t('content')}</SelectItem>
                                <SelectItem value="quiz">{t('quiz')}</SelectItem>
                                <SelectItem value="collection">{t('collection')}</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
                            <SelectTrigger className="w-[160px] bg-card border-border">
                                <SelectValue placeholder={t('lastUpdated')} />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border z-50">
                                <SelectItem value="updated">{t('lastUpdated')}</SelectItem>
                                <SelectItem value="created">{t('dateCreated')}</SelectItem>
                                <SelectItem value="title">{t('titleAZ')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkspaceHeader;
