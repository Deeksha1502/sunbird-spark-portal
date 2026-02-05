import React from "react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export const Header = ({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) => (
    <div className={cn("auth-header", className)}>
        <h1 className="auth-title">{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
    </div>
);

export const InputLabel = ({ children, htmlFor, required, className }: { children: React.ReactNode, htmlFor?: string, required?: boolean, className?: string }) => (
    <label htmlFor={htmlFor} className={cn("auth-input-label", className)}>
        {children}
        {required && <span className="text-black ml-1">*</span>}
    </label>
);

export const PrimaryButton = ({ children, onClick, disabled, className = "" }: { children: React.ReactNode, onClick: () => void, disabled?: boolean, className?: string }) => (
    <Button
        className={cn("auth-primary-btn", className)}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </Button>
);
