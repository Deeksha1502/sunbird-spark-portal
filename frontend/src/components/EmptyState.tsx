import { FiFileText, FiPlus } from "react-icons/fi";
import { Button } from "@/components/button";
import { useAppI18n } from "@/hooks/useAppI18n";
import { IconType } from "react-icons";

interface EmptyStateProps { title: string; description: string; actionLabel?: string; onAction?: () => void; icon?: IconType; }

const EmptyState = ({ title, description, actionLabel, onAction, icon: Icon = FiFileText }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6"><Icon className="w-10 h-10 text-muted-foreground" /></div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-md mb-6">{description}</p>
            {actionLabel && onAction && (<Button onClick={onAction} className="gap-2"><FiPlus className="w-4 h-4" />{actionLabel}</Button>)}
        </div>
    );
};

export default EmptyState;
