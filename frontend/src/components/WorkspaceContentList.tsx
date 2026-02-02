import { FiBook, FiFileText, FiHelpCircle, FiFolder, FiTrash2, FiEdit2, FiEye, FiSend } from "react-icons/fi";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { cn } from "@/lib/utils";
import { useAppI18n } from "@/hooks/useAppI18n";
import type { WorkspaceItem, ContentType, ContentStatus } from "@/configs/workspaceData";
import { IconType } from "react-icons";

interface WorkspaceContentListProps {
    items: WorkspaceItem[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
    onSubmitReview?: (id: string) => void;
}

const typeIcons: Record<ContentType, IconType> = { course: FiBook, content: FiFileText, quiz: FiHelpCircle, collection: FiFolder };
const statusColors: Record<ContentStatus, string> = { draft: 'bg-amber-100 text-amber-800 border-amber-200', review: 'bg-blue-100 text-blue-800 border-blue-200', published: 'bg-green-100 text-green-800 border-green-200' };

const WorkspaceContentList = ({ items, onEdit, onDelete, onView, onSubmitReview }: WorkspaceContentListProps) => {
    const { t, currentCode } = useAppI18n();
    const statusLabels: Record<ContentStatus, string> = { draft: t('draft'), review: t('underReview'), published: t('published') };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return t('today');
        if (diffDays === 1) return t('yesterday');
        if (diffDays < 7) return `${diffDays} ${t('daysAgo')}`;
        return date.toLocaleDateString(currentCode === 'ar' ? 'ar-SA' : currentCode === 'pt' ? 'pt-BR' : currentCode === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="font-semibold text-foreground">{t('content')}</TableHead>
                        <TableHead className="font-semibold text-foreground">{t('allTypes').replace('All ', '')}</TableHead>
                        <TableHead className="font-semibold text-foreground">{t('lastUpdated')}</TableHead>
                        <TableHead className="font-semibold text-foreground">Status</TableHead>
                        <TableHead className="font-semibold text-foreground text-end">{t('view')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => {
                        const Icon = typeIcons[item.type];
                        return (
                            <TableRow key={item.id} className="group hover:bg-muted/30">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                                            {item.thumbnail ? <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Icon className="w-5 h-5 text-muted-foreground" /></div>}
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                                            <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell><div className="flex items-center gap-1.5 text-muted-foreground capitalize"><Icon className="w-4 h-4" /><span className="text-sm">{t(item.type)}</span></div></TableCell>
                                <TableCell className="text-muted-foreground text-sm">{formatDate(item.updatedAt)}</TableCell>
                                <TableCell><Badge variant="outline" className={cn("text-xs", statusColors[item.status])}>{statusLabels[item.status]}</Badge></TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onView?.(item.id)}><FiEye className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit?.(item.id)}><FiEdit2 className="w-4 h-4" /></Button>
                                        {item.status === 'draft' && <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary" onClick={() => onSubmitReview?.(item.id)}><FiSend className="w-4 h-4" /></Button>}
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete?.(item.id)}><FiTrash2 className="w-4 h-4" /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default WorkspaceContentList;
