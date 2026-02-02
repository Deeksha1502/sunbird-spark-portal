import { FiPlus, FiFolder, FiEdit, FiSend, FiCheckCircle, FiUpload, FiUsers } from "react-icons/fi";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/utils";
import { useAppI18n } from "@/hooks/useAppI18n";

export type WorkspaceView = 'create' | 'all' | 'drafts' | 'review' | 'published' | 'uploads' | 'collaborations';

interface WorkspaceSidebarProps {
    activeView: WorkspaceView;
    onViewChange: (view: WorkspaceView) => void;
    counts: { drafts: number; review: number; published: number; all: number };
}

const WorkspaceSidebar = ({ activeView, onViewChange, counts }: WorkspaceSidebarProps) => {
    const { t } = useAppI18n();
    const menuItems = [
        { id: 'create' as const, label: t('createNew'), icon: FiPlus },
        { id: 'all' as const, label: t('allMyContent'), icon: FiFolder, count: counts.all },
        { id: 'drafts' as const, label: t('drafts'), icon: FiEdit, count: counts.drafts },
        { id: 'review' as const, label: t('submittedForReview'), icon: FiSend, count: counts.review },
        { id: 'published' as const, label: t('published'), icon: FiCheckCircle, count: counts.published },
        { id: 'uploads' as const, label: t('allUploads'), icon: FiUpload },
        { id: 'collaborations' as const, label: t('collaborations'), icon: FiUsers },
    ];

    return (
        <nav className="space-y-1">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                    <button key={item.id} onClick={() => onViewChange(item.id)} className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all", isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted")}>
                        <div className="flex items-center gap-3"><Icon className="w-4 h-4" /><span>{item.label}</span></div>
                        {item.count !== undefined && <Badge variant={isActive ? "secondary" : "outline"} className={cn("min-w-[24px] justify-center", isActive && "bg-primary-foreground/20 text-primary-foreground border-transparent")}>{item.count}</Badge>}
                    </button>
                );
            })}
        </nav>
    );
};

export default WorkspaceSidebar;
