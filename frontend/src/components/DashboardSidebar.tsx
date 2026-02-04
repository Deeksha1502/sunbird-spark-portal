import React from "react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/select";
import { filterOptions } from "@/data/dashboardData";

interface DashboardSidebarProps {
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const DashboardSidebar = ({ filters, setFilters }: DashboardSidebarProps) => {
    return (
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
                                    value={filters[key]}
                                    onValueChange={(value) => setFilters((prev: any) => ({ ...prev, [key]: value }))}
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
    );
};

export default DashboardSidebar;
