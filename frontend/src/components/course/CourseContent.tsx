import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiChevronUp, FiChevronDown, FiCheckCircle, FiLock, FiPlay } from "react-icons/fi";
import { Card, CardContent } from "@/components/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/collapsible";
import { Module } from "@/utils/courseUtils";

interface CourseContentProps {
    modules: Module[];
    expandedModules: string[];
    toggleModule: (moduleId: string) => void;
    lessonProgress: Record<string, boolean>;
    courseId: string | undefined;
}

const CourseContent = ({ modules, expandedModules, toggleModule, lessonProgress, courseId }: CourseContentProps) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
                Course Content
            </h2>
            <div className="space-y-3">
                {modules.map((module) => (
                    <Collapsible
                        key={module.id}
                        open={expandedModules.includes(module.id)}
                        onOpenChange={() => toggleModule(module.id)}
                    >
                        <Card className="border-border">
                            <CollapsibleTrigger asChild>
                                <CardContent className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <FiBookOpen className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-foreground">
                                                    {module.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {module.lessons.length} lessons •
                                                    {module.lessons.filter(l => lessonProgress[l.id]).length} completed
                                                </p>
                                            </div>
                                        </div>
                                        {expandedModules.includes(module.id) ? (
                                            <FiChevronUp className="w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <FiChevronDown className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </div>
                                </CardContent>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="border-t border-border">
                                    {module.lessons.map((lesson) => {
                                        const isCompleted = lessonProgress[lesson.id] ?? lesson.isCompleted;
                                        return (
                                            <div
                                                key={lesson.id}
                                                onClick={() => !lesson.isLocked && navigate(`/course/${courseId}/lesson/${lesson.id}`)}
                                                className={`flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 transition-colors ${lesson.isLocked
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : "hover:bg-primary/10 cursor-pointer"
                                                    }`}
                                            >
                                                <div className="w-6 h-6 flex items-center justify-center">
                                                    {isCompleted ? (
                                                        <FiCheckCircle className="w-5 h-5 text-green-500" />
                                                    ) : lesson.isLocked ? (
                                                        <FiLock className="w-4 h-4 text-muted-foreground" />
                                                    ) : (
                                                        <FiPlay className="w-4 h-4 text-primary" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm ${isCompleted ? "text-muted-foreground" : "text-foreground"}`}>
                                                        {lesson.title}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {lesson.duration}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>
                ))}
            </div>
        </div>
    );
};

export default CourseContent;
