import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiSearch,
    FiGlobe,
    FiChevronDown,
    FiBell,
    FiX,
    FiTrash2,
    FiStar,
    FiClock,
    FiEdit2
} from "react-icons/fi";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Badge } from "@/components/badge";
import { Card, CardContent } from "@/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/popover";
import PageLoader from "@/components/PageLoader";
import TermsDialog from "@/components/TermsDialog";
import sunbirdLogo from "@/assets/sunbird-logo.png";
import { useAppI18n } from "@/hooks/useAppI18n";

// Mock course data with additional fields for dashboard
const dashboardCourses = [
    {
        id: "1",
        title: "New Course for January",
        author: "Sunbird",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
        badges: ["Course", "English"],
        category: "My courses",
        language: "English",
        rating: 4.8,
        duration: "2h 30m",
    },
    {
        id: "2",
        title: "New Course 21",
        author: "Sunbird",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
        badges: ["Course", "English"],
        category: "My courses",
        language: "English",
        rating: 4.5,
        duration: "1h 45m",
    },
    {
        id: "3",
        title: "New Course 02",
        author: "Sunbird",
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop",
        badges: ["Course", "English"],
        category: "My courses",
        language: "English",
        rating: 4.7,
        duration: "3h 15m",
    },
    {
        id: "4",
        title: "Leadership Excellence",
        author: "Dr. Sarah Johnson",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
        badges: ["Course", "English"],
        category: "English",
        language: "English",
        rating: 4.9,
        duration: "4h 00m",
    },
    {
        id: "5",
        title: "Python Programming",
        author: "Michael Chen",
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop",
        badges: ["Course", "English"],
        category: "English",
        language: "English",
        rating: 4.6,
        duration: "5h 30m",
    },
    {
        id: "6",
        title: "Communication Skills",
        author: "Emily Rodriguez",
        thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=225&fit=crop",
        badges: ["Course", "English"],
        category: "English",
        language: "English",
        rating: 4.4,
        duration: "2h 00m",
    },
    {
        id: "7",
        title: "Data Analytics Basics",
        author: "David Park",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
        badges: ["Course", "Hindi"],
        category: "Hindi",
        language: "Hindi",
        rating: 4.7,
        duration: "3h 45m",
    },
    {
        id: "8",
        title: "Project Management",
        author: "James Wilson",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop",
        badges: ["Course", "Hindi"],
        category: "Hindi",
        language: "Hindi",
        rating: 4.5,
        duration: "2h 15m",
    },
    {
        id: "9",
        title: "Cloud Computing",
        author: "Lisa Thompson",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
        badges: ["Course", "Hindi"],
        category: "Hindi",
        language: "Hindi",
        rating: 4.8,
        duration: "4h 30m",
    },
];

interface Notification {
    id: string;
    message: string;
    date: string;
}

const mockNotificationsData: Notification[] = [
    {
        id: "1",
        message: "COURSE_TEST_1 has been assigned to Group 1312 group by Content Creator",
        date: "Tue, 13 January 3:12",
    },
    {
        id: "2",
        message: "You have been added to Group 1312 group by Content Creator",
        date: "Tue, 13 January 2:48",
    },
];

const filterOptions = {
    board: ["All", "CBSE", "State Board", "ICSE"],
    medium: ["All", "English", "Hindi", "Telugu", "Tamil"],
    grade: ["All", "Grade 1-5", "Grade 6-8", "Grade 9-10", "Grade 11-12"],
    class: ["All", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
    subject: ["All", "Mathematics", "Science", "English", "Social Studies"],
    publisher: ["All", "Sunbird", "NCERT", "State Publisher"],
    mode: ["All", "Online", "Offline", "Hybrid"],
    audience: ["All", "Students", "Teachers", "Administrators"],
    appName: ["All", "Sunbird Ed", "Diksha", "Other"],
};

const Dashboard = () => {
    const navigate = useNavigate();
    const { languages, currentCode, changeLanguage } = useAppI18n();
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState<Notification[]>(mockNotificationsData);
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

    const currentLanguage = languages.find(l => l.code === currentCode) || languages[0];

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

    const handleLanguageChange = (lang: any) => changeLanguage(lang.code);

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
            {/* Dashboard Header - matching main Header style */}
            <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <a href="/" className="flex items-center">
                            <img src={sunbirdLogo} alt="Sunbird Spark" className="h-10 w-auto" />
                        </a>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-xl mx-8 hidden md:block">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search content, courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-muted/50 border-border focus:bg-card focus:ring-2 focus:ring-primary/30"
                                />
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Notifications - matching main Header style */}
                            <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative">
                                        <FiBell className="w-5 h-5" />
                                        {notifications.length > 0 && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    className="w-96 p-0 bg-muted/95 border-border shadow-lg z-50"
                                >
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-foreground">
                                                {notifications.length} New Notification(s)
                                            </h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => setIsNotificationOpen(false)}
                                            >
                                                <FiX className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="space-y-3 max-h-80 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <p className="text-muted-foreground text-sm text-center py-4">
                                                    No new notifications
                                                </p>
                                            ) : (
                                                notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className="bg-card p-4 rounded-lg border border-border"
                                                    >
                                                        <p className="text-xs text-muted-foreground mb-1">
                                                            {notification.date}
                                                        </p>
                                                        <p className="text-sm text-foreground">
                                                            {notification.message}
                                                        </p>
                                                        <div className="flex justify-end mt-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                                onClick={() => handleDeleteNotification(notification.id)}
                                                            >
                                                                <FiTrash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            {/* Language Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                                        <FiGlobe className="w-4 h-4" />
                                        <span className="hidden lg:inline">{currentLanguage?.label}</span>
                                        <FiChevronDown className="w-3 h-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-card border-border z-50">
                                    {languages.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang)}
                                            className={currentCode === lang.code ? "bg-muted" : ""}
                                        >
                                            <span className="mr-2">{lang.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Workspace Link */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 hidden sm:flex"
                                onClick={() => navigate('/workspace')}
                            >
                                <FiEdit2 className="w-4 h-4" />
                                <span className="hidden lg:inline">Workspace</span>
                            </Button>

                            {/* User Avatar */}
                            <Avatar className="h-9 w-9 border-2 border-primary cursor-pointer">
                                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                                <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>

                {/* Header Filters */}
                <div className="bg-muted/50 border-t border-border">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-3 overflow-x-auto py-3">
                            {["board", "medium", "grade", "class", "subject"].map((key) => (
                                <Select
                                    key={key}
                                    value={filters[key as keyof typeof filters]}
                                    onValueChange={(value) => setFilters(prev => ({ ...prev, [key]: value }))}
                                >
                                    <SelectTrigger className="w-auto min-w-[120px] bg-card border-border text-sm h-9">
                                        <SelectValue placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-border z-50">
                                        {filterOptions[key as keyof typeof filterOptions].map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ))}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary shrink-0"
                                onClick={() => setFilters({
                                    board: "All",
                                    medium: "All",
                                    grade: "All",
                                    class: "All",
                                    subject: "All",
                                    publisher: "All",
                                    mode: "All",
                                    audience: "All",
                                    appName: "All",
                                })}
                            >
                                Reset Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Left Sidebar - Filters */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <Card className="sticky top-44 border-border shadow-sm">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="font-semibold text-foreground">Narrow by</h3>
                                    <Button variant="ghost" size="sm" className="text-primary text-xs h-auto p-1">
                                        Reset ✕
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {Object.entries(filterOptions).map(([key, options]) => (
                                        <div key={key}>
                                            <label className="text-sm font-medium text-muted-foreground capitalize mb-1.5 block">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            <Select
                                                value={filters[key as keyof typeof filters]}
                                                onValueChange={(value) => setFilters(prev => ({ ...prev, [key]: value }))}
                                            >
                                                <SelectTrigger className="w-full bg-muted/50 border-border">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-card border-border z-50">
                                                    {options.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

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

// Dashboard Course Card - matching main CourseCard styling
interface DashboardCourseProps {
    id: string;
    title: string;
    author: string;
    thumbnail: string;
    badges: string[];
    rating: number;
    duration: string;
}

const DashboardCourseCard = ({ course, onClick }: { course: DashboardCourseProps; onClick: () => void }) => {
    return (
        <Card
            onClick={onClick}
            className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 bg-card cursor-pointer h-full"
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden">
                <div
                    className="aspect-video bg-muted bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                        backgroundImage: `url(${course.thumbnail})`,
                        backgroundColor: 'hsl(var(--muted))'
                    }}
                />
                <Badge
                    variant="outline"
                    className="absolute top-3 end-3 bg-card/90 backdrop-blur-sm"
                >
                    {course.badges[0]}
                </Badge>
            </div>

            <CardContent className="p-4 md:p-5">
                {/* Language Badge */}
                <p className="text-xs font-medium text-primary mb-2">{course.badges[1]}</p>

                {/* Title */}
                <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                </h3>

                {/* Author */}
                <p className="text-sm text-muted-foreground mb-3">by {course.author}</p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <FiStar className="w-4 h-4 fill-secondary text-secondary" />
                        <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FiClock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Dashboard;
