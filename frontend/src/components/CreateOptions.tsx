import { FiBook, FiFileText, FiHelpCircle, FiFolder, FiUpload, FiVideo, FiClipboard } from "react-icons/fi";
import { Card, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";
import { useAppI18n } from "@/hooks/useAppI18n";
import { IconType } from "react-icons";

interface CreateOption { id: string; titleKey: string; descKey: string; icon: IconType; variant: 'primary' | 'secondary'; }
interface CreateOptionsProps { onOptionSelect: (optionId: string) => void; }

const createOptions: CreateOption[] = [
    { id: 'course', titleKey: 'course', descKey: 'courseDesc', icon: FiBook, variant: 'primary' },
    { id: 'content', titleKey: 'content', descKey: 'contentDesc', icon: FiFileText, variant: 'primary' },
    { id: 'quiz', titleKey: 'quiz', descKey: 'quizDesc', icon: FiHelpCircle, variant: 'primary' },
    { id: 'collection', titleKey: 'collection', descKey: 'collectionDesc', icon: FiFolder, variant: 'primary' },
];

const uploadOptions: CreateOption[] = [
    { id: 'upload-content', titleKey: 'uploadContent', descKey: 'uploadContentDesc', icon: FiUpload, variant: 'secondary' },
    { id: 'upload-video', titleKey: 'uploadLargeVideos', descKey: 'uploadLargeVideosDesc', icon: FiVideo, variant: 'secondary' },
    { id: 'assessment', titleKey: 'courseAssessment', descKey: 'courseAssessmentDesc', icon: FiClipboard, variant: 'secondary' },
];

const CreateOptions = ({ onOptionSelect }: CreateOptionsProps) => {
    const { t } = useAppI18n();
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">{t('createNew')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {createOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <Card key={option.id} onClick={() => onOptionSelect(option.id)} className={cn("cursor-pointer border-2 border-border transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 group")}>
                                <CardContent className="p-6 text-center">
                                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300"><Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" /></div>
                                    <h3 className="font-semibold text-foreground mb-2">{t(option.titleKey)}</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{t(option.descKey)}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">{t('uploadAssessments')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {uploadOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <Card key={option.id} onClick={() => onOptionSelect(option.id)} className={cn("cursor-pointer border border-border transition-all duration-300 hover:border-secondary hover:shadow-md hover:-translate-y-0.5 group bg-card/50")}>
                                <CardContent className="p-5 flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors"><Icon className="w-5 h-5 text-secondary-foreground" /></div>
                                    <div><h3 className="font-medium text-foreground text-sm mb-1">{t(option.titleKey)}</h3><p className="text-xs text-muted-foreground leading-relaxed">{t(option.descKey)}</p></div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreateOptions;
