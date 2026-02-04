import React from "react";
import { OptionItem } from "@/data/onboardingData";

export const ProgressIndicator = ({ step }: { step: number }) => (
    <div className="flex items-center gap-1 mb-4">
        <div className={`h-[3px] w-[13px] rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-300'}`} />
        <div className={`h-[3px] w-[13px] rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
        <div className={`h-[3px] w-[13px] rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`} />
        <span className="text-base text-foreground ml-2">{step}/3</span>
    </div>
);

export const OptionChip = ({
    option,
    isSelected,
    onClick,
    showIcon = false
}: {
    option: OptionItem;
    isSelected: boolean;
    onClick: () => void;
    showIcon?: boolean;
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`
    relative flex flex-col items-center justify-center gap-2 rounded-[14px] transition-all w-[112px] h-[82px]
    ${isSelected
                ? 'bg-sunbird-ink text-white border-0'
                : 'bg-white text-foreground border border-primary hover:bg-primary/5'
            }
  `}
    >
        {isSelected && (
            <div className="absolute top-1.5 right-1.5">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7.5" cy="7.5" r="6.5" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                    <path d="M4 7.5L6.625 10L11 5" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                </svg>
            </div>
        )}
        {showIcon && option.icon && (
            <span className={`${isSelected ? 'text-white/80' : 'text-sunbird-ink'}`}>
                {React.cloneElement(option.icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
            </span>
        )}
        <span className="text-base font-normal">{option.label}</span>
    </button>
);
