import { FiPlay } from "react-icons/fi";
import { Button } from "@/components/button";
import { Progress } from "@/components/progress";
import { Card, CardContent } from "@/components/card";

interface CourseSidebarProps {
    course: any;
    progress: number;
    completedLessons: number;
    handleContinueLearning: () => void;
}

const CourseSidebar = ({ course, progress, completedLessons, handleContinueLearning }: CourseSidebarProps) => {
    return (
        <div className="space-y-6">
            {/* Progress Card */}
            <Card className="border-border sticky top-24">
                <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                        Your Progress
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Overall Progress</span>
                                <span className="font-medium text-foreground">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-3" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary">{completedLessons}</p>
                                <p className="text-sm text-muted-foreground">Completed</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-foreground">{course.lessons - completedLessons}</p>
                                <p className="text-sm text-muted-foreground">Remaining</p>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-primary hover:bg-primary/90 gap-2"
                            onClick={handleContinueLearning}
                        >
                            <FiPlay className="w-4 h-4" />
                            Continue Learning
                        </Button>

                        <div className="text-center pt-2">
                            <p className="text-xs text-muted-foreground">
                                Last accessed 2 days ago
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Course Info */}
            <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-foreground">Course Details</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Level</span>
                            <span className="text-foreground">{course.level}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="text-foreground">{course.duration}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Lessons</span>
                            <span className="text-foreground">{course.lessons}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Category</span>
                            <span className="text-foreground">{course.category}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseSidebar;
