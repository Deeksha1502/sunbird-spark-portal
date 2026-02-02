import React, { useState } from "react";
import { FiCheck, FiCode, FiEdit3, FiTrendingUp, FiBriefcase, FiLayout, FiMoreHorizontal, FiCpu, FiServer, FiBox, FiTerminal, FiGitBranch } from "react-icons/fi";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useNavigate } from "react-router-dom";
import sunbirdLogo from "@/assets/sunbird-logo.png";

type OnboardingStep = 1 | 2 | 3;

interface OptionItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

const languageOptions: OptionItem[] = [
    { id: "english", label: "English" },
    { id: "arabic", label: "Arabic" },
    { id: "french", label: "French" },
    { id: "hindi", label: "Hindi" },
    { id: "kannada", label: "Kannada" },
    { id: "other", label: "Other" },
];

const roleOptions: OptionItem[] = [
    { id: "developer", label: "Developer", icon: <FiCode className="w-5 h-5" /> },
    { id: "teacher", label: "Teacher", icon: <FiEdit3 className="w-5 h-5" /> },
    { id: "marketer", label: "Marketer", icon: <FiTrendingUp className="w-5 h-5" /> },
    { id: "entrepreneur", label: "Entrepreneur", icon: <FiBriefcase className="w-5 h-5" /> },
    { id: "designer", label: "Designer", icon: <FiLayout className="w-5 h-5" /> },
    { id: "other", label: "Other", icon: <FiMoreHorizontal className="w-5 h-5" /> },
];

const skillsByRole: Record<string, OptionItem[]> = {
    developer: [
        { id: "ai-ml", label: "AI and ML", icon: <FiCpu className="w-5 h-5" /> },
        { id: "nodejs", label: "Node JS", icon: <FiServer className="w-5 h-5" /> },
        { id: "reactjs", label: "React JS", icon: <FiBox className="w-5 h-5" /> },
        { id: "javascript", label: "JavaScript", icon: <FiTerminal className="w-5 h-5" /> },
        { id: "devops", label: "DevOps", icon: <FiGitBranch className="w-5 h-5" /> },
        { id: "other", label: "Other", icon: <FiMoreHorizontal className="w-5 h-5" /> },
    ],
    teacher: [
        { id: "curriculum", label: "Curriculum Design", icon: <FiEdit3 className="w-5 h-5" /> },
        { id: "assessment", label: "Assessment", icon: <FiCheck className="w-5 h-5" /> },
        { id: "elearning", label: "E-Learning", icon: <FiLayout className="w-5 h-5" /> },
        { id: "other", label: "Other", icon: <FiMoreHorizontal className="w-5 h-5" /> },
    ],
    marketer: [
        { id: "digital", label: "Digital Marketing", icon: <FiTrendingUp className="w-5 h-5" /> },
        { id: "content", label: "Content Marketing", icon: <FiEdit3 className="w-5 h-5" /> },
        { id: "seo", label: "SEO", icon: <FiCode className="w-5 h-5" /> },
        { id: "other", label: "Other", icon: <FiMoreHorizontal className="w-5 h-5" /> },
    ],
    entrepreneur: [
        { id: "startup", label: "Startup Management", icon: <FiBriefcase className="w-5 h-5" /> },
        { id: "finance", label: "Finance", icon: <FiTrendingUp className="w-5 h-5" /> },
        { id: "leadership", label: "Leadership", icon: <FiCheck className="w-5 h-5" /> },
        { id: "other", label: "Other", icon: <FiMoreHorizontal className="w-5 h-5" /> },
    ],
    designer: [
        { id: "ui-ux", label: "UI/UX Design", icon: <FiLayout className="w-5 h-5" /> },
        { id: "graphic", label: "Graphic Design", icon: <FiEdit3 className="w-5 h-5" /> },
        { id: "motion", label: "Motion Design", icon: <FiBox className="w-5 h-5" /> },
        { id: "other", label: "Other", icon: <FiMoreHorizontal className="w-5 h-5" /> },
    ],
    other: [
        { id: "general", label: "General Skills", icon: <FiCheck className="w-5 h-5" /> },
        { id: "communication", label: "Communication", icon: <FiEdit3 className="w-5 h-5" /> },
        { id: "other", label: "Other", icon: <FiMoreHorizontal className="w-5 h-5" /> },
    ],
};

const Onboarding = () => {
    const [step, setStep] = useState<OnboardingStep>(1);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("english");
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [otherSkillText, setOtherSkillText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSkip = () => {
        navigate("/home");
    };

    const handleNext = () => {
        if (step < 3) {
            setStep((step + 1) as OnboardingStep);
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);
        // Simulate saving preferences
        setTimeout(() => {
            setIsLoading(false);
            navigate("/home");
        }, 1000);
    };

    const toggleSkill = (skillId: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skillId)
                ? prev.filter((s) => s !== skillId)
                : [...prev, skillId]
        );
    };

    const currentSkills = (selectedRole ? skillsByRole[selectedRole] || skillsByRole.other : skillsByRole.developer) || [];
    const showOtherInput = selectedSkills.includes("other");

    const ProgressIndicator = () => (
        <div className="flex items-center gap-1 mb-4">
            <div className={`h-[3px] w-[13px] rounded-full ${step >= 1 ? 'bg-primary' : 'bg-[#C1C1C1]'}`} />
            <div className={`h-[3px] w-[13px] rounded-full ${step >= 2 ? 'bg-primary' : 'bg-[#C1C1C1]'}`} />
            <div className={`h-[3px] w-[13px] rounded-full ${step >= 3 ? 'bg-primary' : 'bg-[#C1C1C1]'}`} />
            <span className="text-base text-foreground ml-2">{step}/3</span>
        </div>
    );

    const OptionChip = ({
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
                    ? 'bg-[#376673] text-white border-0'
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
                <span className={`${isSelected ? 'text-white/80' : 'text-[#376673]'}`}>
                    {React.cloneElement(option.icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
                </span>
            )}
            <span className="text-base font-normal">{option.label}</span>
        </button>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <ProgressIndicator />

            <div>
                <h2 className="text-2xl font-medium text-foreground mb-6">
                    What is your language preference?
                </h2>

                <div className="grid grid-cols-3 gap-4" style={{ width: '360px' }}>
                    {languageOptions.map((option) => (
                        <OptionChip
                            key={option.id}
                            option={option}
                            isSelected={selectedLanguage === option.id}
                            onClick={() => setSelectedLanguage(option.id)}
                        />
                    ))}
                </div>
            </div>

            <Button
                onClick={handleNext}
                className="h-[46px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg rounded-xl"
                style={{ width: '360px' }}
                disabled={!selectedLanguage}
            >
                Save and Proceed
            </Button>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-8">
            <ProgressIndicator />

            <div>
                <h2 className="text-base font-semibold text-foreground mb-4">
                    What role describes you the best?
                </h2>

                <div className="grid grid-cols-3 gap-3 max-w-md">
                    {roleOptions.map((option) => (
                        <OptionChip
                            key={option.id}
                            option={option}
                            isSelected={selectedRole === option.id}
                            onClick={() => {
                                setSelectedRole(option.id);
                                setSelectedSkills([]);
                                setOtherSkillText("");
                            }}
                            showIcon
                        />
                    ))}
                </div>
            </div>

            <Button
                onClick={handleNext}
                className="w-full max-w-md h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full"
                disabled={!selectedRole}
            >
                Save and Proceed
            </Button>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-8">
            <ProgressIndicator />

            <div>
                <h2 className="text-base font-semibold text-foreground mb-4">
                    What skills would you like to learn as a {selectedRole || 'developer'}?
                </h2>

                {!showOtherInput ? (
                    <div className="grid grid-cols-3 gap-3 max-w-md">
                        {currentSkills.map((option) => (
                            <OptionChip
                                key={option.id}
                                option={option}
                                isSelected={selectedSkills.includes(option.id)}
                                onClick={() => toggleSkill(option.id)}
                                showIcon
                            />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4 max-w-md">
                        <Input
                            type="text"
                            placeholder="Please type your preference here"
                            value={otherSkillText}
                            onChange={(e) => setOtherSkillText(e.target.value)}
                            className="h-11 bg-white border-gray-200 focus:border-primary rounded-lg"
                        />
                    </div>
                )}
            </div>

            <Button
                onClick={handleSubmit}
                className="w-full max-w-md h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full"
                disabled={isLoading || (selectedSkills.length === 0 && !showOtherInput) || (showOtherInput && !otherSkillText.trim())}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Saving...
                    </span>
                ) : (
                    "Submit"
                )}
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col">
                {/* Logo */}
                <div className="mb-8">
                    <img src={sunbirdLogo} alt="Sunbird" className="h-8 w-auto" />
                </div>

                {/* Title */}
                <div className="mb-10">
                    <h1 className="text-[30px] font-medium text-foreground leading-[40px]">
                        We would love to help you personalize your experience!
                    </h1>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </div>

                {/* Skip Link */}
                <div className="mt-8">
                    <button
                        type="button"
                        onClick={handleSkip}
                        className="text-primary hover:text-primary/80 font-medium transition-colors text-sm"
                    >
                        Skip Onboarding
                    </button>
                </div>
            </div>

            {/* Right Side - Image with curved mask */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                {/* Main image */}
                <img
                    src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Decorative plants"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ borderRadius: '99px 0 0 99px', marginLeft: '40px' }}
                />
                {/* Top-left decorative curve */}
                <svg
                    className="absolute -left-2 -top-3"
                    width="143"
                    height="174"
                    viewBox="0 0 143 174"
                    fill="none"
                >
                    <path
                        d="M6.00254 173.556C5.94269 173.203 5.88827 172.846 5.83928 172.485C-7.53539 84.1682 3.94305 28.6787 21.3369 15.5272C45.1904 -9.68932 119.732 1.89665 142.734 8.28597C115.132 10.6713 103.546 32.5654 97.5828 61.5303C83.9522 107.959 60.0988 101.996 42.2088 112.645C15.0521 126.432 3.33086 154.016 5.83928 172.485C5.89329 172.841 5.94771 173.199 6.00254 173.556Z"
                        fill="white"
                    />
                </svg>
                {/* Bottom-right decorative curve */}
                <svg
                    className="absolute right-0 bottom-0"
                    width="168"
                    height="182"
                    viewBox="0 0 168 182"
                    fill="none"
                >
                    <path
                        d="M160.768 1.40548e-05C160.834 0.342665 160.893 0.689391 160.947 1.04002C176.694 93.4236 163.196 151.469 142.738 165.223C114.691 191.587 27.0452 179.474 7.57356e-07 172.794C32.4542 170.3 45.4209 147.38 53.0887 117.126C68.1313 70.2825 102.171 73.0365 118.197 63.6842C149.175 51.7561 163.914 20.4369 160.947 1.04002C160.888 0.693846 160.828 0.347152 160.768 1.40548e-05Z"
                        fill="white"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Onboarding;
