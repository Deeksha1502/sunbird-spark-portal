import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sunbirdLogo from "@/assets/sunbird-logo.png";
import { skillsByRole } from "@/data/onboardingData";
import { OnboardingStep1, OnboardingStep2, OnboardingStep3 } from "@/components/onboarding/OnboardingSteps";

type OnboardingStep = 1 | 2 | 3;

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

    const handleRoleSelect = (roleId: string) => {
        setSelectedSkills([]);
        setOtherSkillText("");
    };

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
                    <h1 className="text-[1.875rem] font-medium text-foreground leading-[2.5rem]">
                        We would love to help you personalize your experience!
                    </h1>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                    {step === 1 && (
                        <OnboardingStep1
                            selectedLanguage={selectedLanguage}
                            setSelectedLanguage={setSelectedLanguage}
                            onNext={handleNext}
                        />
                    )}
                    {step === 2 && (
                        <OnboardingStep2
                            selectedRole={selectedRole}
                            setSelectedRole={setSelectedRole}
                            onRoleSelect={handleRoleSelect}
                            onNext={handleNext}
                        />
                    )}
                    {step === 3 && (
                        <OnboardingStep3
                            selectedRole={selectedRole}
                            currentSkills={currentSkills}
                            selectedSkills={selectedSkills}
                            toggleSkill={toggleSkill}
                            showOtherInput={showOtherInput}
                            otherSkillText={otherSkillText}
                            setOtherSkillText={setOtherSkillText}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                    )}
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
                    className="absolute inset-0 w-full h-full object-cover rounded-l-[6.1875rem] ml-[2.5rem]"
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
