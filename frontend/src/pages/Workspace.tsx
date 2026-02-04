import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiGlobe, FiChevronDown, FiMenu } from "react-icons/fi";
import sunbirdLogo from "@/assets/sunbird-logo.svg";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import PageLoader from "@/components/PageLoader";
import WorkspaceSidebar, { type WorkspaceView } from "@/components/WorkspaceSidebar";
import CreateOptions from "@/components/CreateOptions";
import WorkspaceContentCard from "@/components/WorkspaceContentCard";
import WorkspaceContentList from "@/components/WorkspaceContentList";
import WorkspaceHeader, { type ViewMode, type SortOption, type ContentTypeFilter } from "@/components/WorkspaceHeader";
import EmptyState from "@/components/EmptyState";
import { workspaceItems, getItemCounts, type WorkspaceItem } from "@/configs/workspaceData";
import { useToast } from "@/hooks/use-toast";
import { LANGUAGES } from "@/configs/languages";
import { useAppI18n } from "@/hooks/useAppI18n";

const Workspace = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const { t, currentCode, changeLanguage, isRTL, languages: hookLanguages } = useAppI18n();
    const [activeView, setActiveView] = useState<WorkspaceView>('create');
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('updated');
    const [typeFilter, setTypeFilter] = useState<ContentTypeFilter>('all');
    const [items, setItems] = useState<WorkspaceItem[]>(workspaceItems);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const currentLanguage = hookLanguages.find(l => l.code === currentCode) || hookLanguages[0];
    const counts = getItemCounts();

    const getViewTitle = (view: WorkspaceView): string => {
        switch (view) {
            case 'create': return t('createNewContent');
            case 'all': return t('allMyContent');
            case 'drafts': return t('drafts');
            case 'review': return t('submittedForReview');
            case 'published': return t('published');
            case 'uploads': return t('allUploads');
            case 'collaborations': return t('collaborations');
            default: return '';
        }
    };

    useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 600); return () => clearTimeout(timer); }, []);
    useEffect(() => { document.documentElement.dir = isRTL ? 'rtl' : 'ltr'; document.documentElement.lang = currentCode; }, [currentCode, isRTL]);

    const filteredItems = useMemo(() => {
        let filtered = [...items];
        if (activeView === 'drafts') filtered = filtered.filter(i => i.status === 'draft');
        else if (activeView === 'review') filtered = filtered.filter(i => i.status === 'review');
        else if (activeView === 'published') filtered = filtered.filter(i => i.status === 'published');
        if (typeFilter !== 'all') filtered = filtered.filter(i => i.type === typeFilter);
        if (searchQuery) { const query = searchQuery.toLowerCase(); filtered = filtered.filter(i => i.title.toLowerCase().includes(query) || i.description.toLowerCase().includes(query)); }
        filtered.sort((a, b) => { switch (sortBy) { case 'updated': return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(); case 'created': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); case 'title': return a.title.localeCompare(b.title); default: return 0; } });
        return filtered;
    }, [items, activeView, typeFilter, searchQuery, sortBy]);

    const handleLanguageChange = (lang: any) => changeLanguage(lang.code);
    const handleCreateOption = (optionId: string) => toast({ title: t('createNew'), description: `Starting ${optionId} creation wizard...` });
    const handleEdit = (id: string) => toast({ title: t('edit'), description: "Opening content editor..." });
    const handleDelete = (id: string) => { setItems(prev => prev.filter(item => item.id !== id)); toast({ title: t('delete'), description: "The content has been removed.", variant: "destructive" }); };
    const handleView = (id: string) => toast({ title: t('view'), description: "Opening content preview..." });
    const handleSubmitReview = (id: string) => { setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'review' as const } : item)); toast({ title: t('submitForReview'), description: "Your content has been submitted for review." }); };

    const renderContent = () => {
        if (activeView === 'create') return <CreateOptions onOptionSelect={handleCreateOption} />;
        if (activeView === 'uploads' || activeView === 'collaborations') return <EmptyState title={activeView === 'uploads' ? t('noUploadsYet') : t('noCollaborations')} description={activeView === 'uploads' ? t('uploadHere') : t('sharedWithYou')} actionLabel={activeView === 'uploads' ? t('uploadContent') : undefined} onAction={activeView === 'uploads' ? () => handleCreateOption('upload-content') : undefined} />;
        if (filteredItems.length === 0) return <EmptyState title={t('noContentFound')} description={searchQuery ? t('tryAdjusting') : t('createFirst')} actionLabel={!searchQuery ? t('createContent') : undefined} onAction={!searchQuery ? () => setActiveView('create') : undefined} />;
        return viewMode === 'grid' ? (<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">{filteredItems.map(item => <WorkspaceContentCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} onSubmitReview={handleSubmitReview} />)}</div>) : (<WorkspaceContentList items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} onSubmitReview={handleSubmitReview} />);
    };

    if (isLoading) return <PageLoader message={`${t('workspace')}...`} />;

    return (
        <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
            <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <div className="lg:hidden"><Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}><SheetTrigger asChild><Button variant="ghost" size="icon"><FiMenu className="w-5 h-5" /></Button></SheetTrigger><SheetContent side={isRTL ? "right" : "left"} className="w-72 p-0"><div className="p-4 border-b border-border"><img src={sunbirdLogo} alt="Sunbird" className="h-8 w-auto" /></div><div className="p-4"><WorkspaceSidebar activeView={activeView} onViewChange={(view) => { setActiveView(view); setMobileMenuOpen(false); }} counts={counts} /></div></SheetContent></Sheet></div>
                        <a href="/" className="flex items-center"><img src={sunbirdLogo} alt="Sunbird" className="h-10 w-auto" /></a>
                        <div className="hidden md:flex items-center gap-2"><span className="text-lg font-semibold text-foreground">{t('workspace')}</span></div>
                        <div className="flex items-center gap-3">
                            <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="gap-2 hidden sm:flex"><FiGlobe className="w-4 h-4" /><span className="hidden lg:inline">{currentLanguage?.label}</span><FiChevronDown className="w-3 h-3" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="bg-card border-border z-50">{hookLanguages.map((lang) => (<DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang)} className={currentCode === lang.code ? "bg-muted" : ""}><span className="me-2">{lang.label}</span></DropdownMenuItem>))}</DropdownMenuContent></DropdownMenu>
                            <Avatar className="h-9 w-9 border-2 border-primary cursor-pointer" onClick={() => navigate('/dashboard')}><AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" /><AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback></Avatar>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-8">
                    <aside className="hidden lg:block w-64 shrink-0"><Card className="sticky top-28 border-border shadow-sm"><CardContent className="p-4"><WorkspaceSidebar activeView={activeView} onViewChange={setActiveView} counts={counts} /></CardContent></Card></aside>
                    <main className="flex-1 min-w-0"><WorkspaceHeader title={getViewTitle(activeView)} searchQuery={searchQuery} onSearchChange={setSearchQuery} viewMode={viewMode} onViewModeChange={setViewMode} sortBy={sortBy} onSortChange={setSortBy} typeFilter={typeFilter} onTypeFilterChange={setTypeFilter} showFilters={activeView !== 'create'} />{renderContent()}</main>
                </div>
            </div>
        </div>
    );
};

export default Workspace;
