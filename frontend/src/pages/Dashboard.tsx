import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/badge";
import PageLoader from "@/components/PageLoader";
import TermsDialog from "@/components/TermsDialog";

import { DashboardNotification } from "@/types";
import { dashboardCourses, mockNotificationsData } from "@/data/dashboardData";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardCourseCard from "@/components/DashboardCourseCard";

const Dashboard = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState<DashboardNotification[]>(mockNotificationsData);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showTermsDialog, setShowTermsDialog] = useState(false);
    const [filters, setFilters] = useState({
        board: "All",
        medium: "All",
        grade: "All",
        class: "All",
        subject: "All",
        publisher: "All",
        mode: "All",
        audience: "All",
        appName: "All",
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Check if terms have been accepted before
            const termsAccepted = localStorage.getItem("termsAccepted");
            if (!termsAccepted) {
                setShowTermsDialog(true);
            }
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleTermsAccept = () => {
        localStorage.setItem("termsAccepted", "true");
        setShowTermsDialog(false);
    };

    const handleDeleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleCourseClick = (courseId: string) => {
        navigate(`/course/${courseId}`);
    };

    const myCourses = dashboardCourses.filter(c => c.category === "My courses");
    const englishCourses = dashboardCourses.filter(c => c.language === "English" && c.category !== "My courses");
    const hindiCourses = dashboardCourses.filter(c => c.language === "Hindi");

    if (isLoading) {
        return <PageLoader message="Loading Sunbird Spark..." />;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Terms and Conditions Dialog */}
            <TermsDialog open={showTermsDialog} onAccept={handleTermsAccept} />

            <DashboardHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                notifications={notifications}
                handleDeleteNotification={handleDeleteNotification}
                isNotificationOpen={isNotificationOpen}
                setIsNotificationOpen={setIsNotificationOpen}
                filters={filters}
                setFilters={setFilters}
            />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Left Sidebar - Filters */}
                    <DashboardSidebar filters={filters} setFilters={setFilters} />

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0">
                        {/* My Courses Section */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-xl font-semibold text-foreground">My courses</h2>
                                <Badge className="bg-secondary text-secondary-foreground">
                                    {myCourses.length}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {myCourses.map((course) => (
                                    <DashboardCourseCard
                                        key={course.id}
                                        course={course}
                                        onClick={() => handleCourseClick(course.id)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* English Courses Section */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-xl font-semibold text-foreground">English</h2>
                                <Badge className="bg-secondary text-secondary-foreground">
                                    {englishCourses.length}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {englishCourses.map((course) => (
                                    <DashboardCourseCard
                                        key={course.id}
                                        course={course}
                                        onClick={() => handleCourseClick(course.id)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Hindi Courses Section */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-xl font-semibold text-foreground">Hindi</h2>
                                <Badge className="bg-secondary text-secondary-foreground">
                                    {hindiCourses.length}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {hindiCourses.map((course) => (
                                    <DashboardCourseCard
                                        key={course.id}
                                        course={course}
                                        onClick={() => handleCourseClick(course.id)}
                                    />
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
