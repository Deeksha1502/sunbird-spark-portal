import {
    FiVideo,
    FiFileText,
    FiLayers,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/collapsible";
import { Module, ContentFilter, Lesson } from "@/utils/lessonUtils";

interface LessonContentListProps {
    contentFilter: ContentFilter;
    setContentFilter: (filter: ContentFilter) => void;
    modules: Module[];
    expandedSections: string[];
    toggleSection: (sectionId: string) => void;
    lessonId: string | undefined;
    handleLessonClick: (lesson: Lesson) => void;
    showCredits: boolean;
    setShowCredits: (open: boolean) => void;
    course: any;
}

const LessonContentList = ({
    contentFilter,
    setContentFilter,
    modules,
    expandedSections,
    toggleSection,
    lessonId,
    handleLessonClick,
    showCredits,
    setShowCredits,
    course
}: LessonContentListProps) => {

    const getContentIcon = (type: "video" | "interactive" | "doc") => {
        switch (type) {
            case "video":
                return <FiVideo className="w-4 h-4" />;
            case "interactive":
                return <FiLayers className="w-4 h-4" />;
            case "doc":
                return <FiFileText className="w-4 h-4" />;
        }
    };

    const filterLessons = (lessons: Lesson[]) => {
        if (contentFilter === "all") return lessons;
        return lessons.filter((l) => l.contentType === contentFilter);
    };

    return (
        <div className="space-y-4">
            {/* Content Type Filters */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant={contentFilter === "all" ? "default" : "outline"}
                    size="sm"
                    className={
                        contentFilter === "all"
                            ? "bg-primary text-primary-foreground"
                            : "bg-white border-border"
                    }
                    onClick={() => setContentFilter("all")}
                >
                    All
                </Button>
                <Button
                    variant={contentFilter === "video" ? "default" : "outline"}
                    size="sm"
                    className={
                        contentFilter === "video"
                            ? "bg-primary text-primary-foreground"
                            : "bg-white border-border"
                    }
                    onClick={() => setContentFilter("video")}
                >
                    <FiVideo className="w-4 h-4 mr-1" />
                    Video
                </Button>
                <Button
                    variant={contentFilter === "interactive" ? "default" : "outline"}
                    size="sm"
                    className={
                        contentFilter === "interactive"
                            ? "bg-primary text-primary-foreground"
                            : "bg-white border-border"
                    }
                    onClick={() => setContentFilter("interactive")}
                >
                    <FiLayers className="w-4 h-4 mr-1" />
                    Interactive
                </Button>
                <Button
                    variant={contentFilter === "doc" ? "default" : "outline"}
                    size="sm"
                    className={
                        contentFilter === "doc"
                            ? "bg-primary text-primary-foreground"
                            : "bg-white border-border"
                    }
                    onClick={() => setContentFilter("doc")}
                >
                    <FiFileText className="w-4 h-4 mr-1" />
                    Docs
                </Button>
            </div>

            {/* Units/Modules List */}
            <div className="space-y-3">
                {modules.map((module) => {
                    const filteredLessons = filterLessons(module.lessons);
                    if (filteredLessons.length === 0 && contentFilter !== "all")
                        return null;

                    return (
                        <Collapsible
                            key={module.id}
                            open={expandedSections.includes(module.id)}
                            onOpenChange={() => toggleSection(module.id)}
                        >
                            <Card className="border-border bg-card">
                                <CollapsibleTrigger asChild>
                                    <CardContent className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-primary">
                                                {module.title}
                                            </span>
                                            {expandedSections.includes(module.id) ? (
                                                <FiChevronUp className="w-5 h-5 text-muted-foreground" />
                                            ) : (
                                                <FiChevronDown className="w-5 h-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </CardContent>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="px-4 pb-4 space-y-2">
                                        {filteredLessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                onClick={() => handleLessonClick(lesson)}
                                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${lesson.id === lessonId
                                                    ? "bg-primary/10 border border-primary/30"
                                                    : "hover:bg-muted/50"
                                                    }`}
                                            >
                                                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-primary">
                                                    {getContentIcon(lesson.contentType)}
                                                </div>
                                                <span
                                                    className={`text-sm ${lesson.id === lessonId
                                                        ? "text-primary font-medium"
                                                        : "text-primary"
                                                        }`}
                                                >
                                                    {lesson.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </Card>
                        </Collapsible>
                    );
                })}
            </div>

            {/* Credits and Licence Information */}
            <Collapsible open={showCredits} onOpenChange={setShowCredits}>
                <Card className="border-border bg-card">
                    <CollapsibleTrigger asChild>
                        <CardContent className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-foreground">
                                    Credits and Licence information
                                </span>
                                {showCredits ? (
                                    <FiChevronUp className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                    <FiChevronDown className="w-5 h-5 text-muted-foreground" />
                                )}
                            </div>
                        </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="px-4 pb-4 text-sm text-muted-foreground">
                            <p className="mb-2">
                                <strong>Author:</strong> {course.instructor}
                            </p>
                            <p className="mb-2">
                                <strong>License:</strong> Creative Commons (CC-BY 4.0)
                            </p>
                            <p>
                                <strong>Published:</strong> SUNBIRD
                            </p>
                        </div>
                    </CollapsibleContent>
                </Card>
            </Collapsible>
        </div>
    );
};

export default LessonContentList;
