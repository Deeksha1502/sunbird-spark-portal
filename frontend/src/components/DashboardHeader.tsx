import React from "react";
import {
    FiSearch,
    FiGlobe,
    FiChevronDown,
    FiBell,
    FiX,
    FiTrash2,
    FiEdit2
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
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
import sunbirdLogo from "@/assets/sunbird-logo.png";
import { useAppI18n } from "@/hooks/useAppI18n";
import { DashboardNotification } from "@/types";
import { filterOptions } from "@/data/dashboardData";

interface DashboardHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    notifications: DashboardNotification[];
    handleDeleteNotification: (id: string) => void;
    isNotificationOpen: boolean;
    setIsNotificationOpen: (open: boolean) => void;
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const DashboardHeader = ({
    searchQuery,
    setSearchQuery,
    notifications,
    handleDeleteNotification,
    isNotificationOpen,
    setIsNotificationOpen,
    filters,
    setFilters,
}: DashboardHeaderProps) => {
    const navigate = useNavigate();
    const { languages, currentCode, changeLanguage } = useAppI18n();
    const currentLanguage = languages.find(l => l.code === currentCode) || languages[0];

    const handleLanguageChange = (lang: any) => changeLanguage(lang.code);

    return (
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
                        {/* Notifications */}
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
                                value={filters[key]}
                                onValueChange={(value) => setFilters((prev: any) => ({ ...prev, [key]: value }))}
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
    );
};

export default DashboardHeader;
