import { FiBook, FiFileText, FiHelpCircle, FiFolder, FiMoreVertical, FiEdit2, FiTrash2, FiEye, FiSend } from "react-icons/fi";
import { Card, CardContent } from "@/components/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAppI18n } from "@/hooks/useAppI18n";
import type { WorkspaceItem, ContentType, ContentStatus } from "@/configs/workspaceData";
import { IconType } from "react-icons";

interface WorkspaceContentCardProps {
    item: WorkspaceItem;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
    onSubmitReview?: (id: string) => void;
}

const typeIcons: Record<ContentType, IconType> = {
    course: FiBook,
    content: FiFileText,
    quiz: FiHelpCircle,
    collection: FiFolder,
};

const typeColors: Record<ContentType, string> = {
    course: 'bg-primary text-primary-foreground',
    content: 'bg-blue-600 text-white',
    quiz: 'bg-purple-600 text-white',
    collection: 'bg-amber-600 text-white',
};

const statusColors: Record<ContentStatus, string> = {
    draft: 'bg-amber-100 text-amber-800 border-amber-200',
    review: 'bg-blue-100 text-blue-800 border-blue-200',
    published: 'bg-green-100 text-green-800 border-green-200',
};

const WorkspaceContentCard = ({ item, onEdit, onDelete, onView, onSubmitReview }: WorkspaceContentCardProps) => {
    const { t, currentCode } = useAppI18n();
    const Icon = typeIcons[item.type];

    const statusLabels: Record<ContentStatus, string> = {
        draft: t('draft'),
        review: t('underReview'),
        published: t('published'),
    };

    const formattedDate = new Date(item.updatedAt).toLocaleDateString(
        currentCode === 'ar' ? 'ar-SA' : currentCode === 'pt' ? 'pt-BR' : currentCode === 'fr' ? 'fr-FR' : 'en-US',
        { month: 'short', day: 'numeric', year: 'numeric' }
    );

    return (
        <Card className="group overflow-hidden border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="relative aspect-video bg-muted overflow-hidden">
                {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                        <Icon className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                )}
                <Badge className={cn("absolute top-3 left-3 capitalize", typeColors[item.type])}>
                    <Icon className="w-3 h-3 me-1" />
                    {t(item.type)}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0"><FiMoreVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border z-50">
                            <DropdownMenuItem onClick={() => onView?.(item.id)} className="cursor-pointer"><FiEye className="w-4 h-4 me-2" />{t('view')}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit?.(item.id)} className="cursor-pointer"><FiEdit2 className="w-4 h-4 me-2" />{t('edit')}</DropdownMenuItem>
                            {item.status === 'draft' && (<DropdownMenuItem onClick={() => onSubmitReview?.(item.id)} className="cursor-pointer"><FiSend className="w-4 h-4 me-2" />{t('submitForReview')}</DropdownMenuItem>)}
                            <DropdownMenuItem onClick={() => onDelete?.(item.id)} className="cursor-pointer text-destructive focus:text-destructive"><FiTrash2 className="w-4 h-4 me-2" />{t('delete')}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description || 'No description provided'}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">{t('updated')} {formattedDate}</span>
                    <Badge variant="outline" className={cn("text-xs", statusColors[item.status])}>{statusLabels[item.status]}</Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default WorkspaceContentCard;
