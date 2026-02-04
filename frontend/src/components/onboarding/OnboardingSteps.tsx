import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { languageOptions, roleOptions } from "@/data/onboardingData";
import { OptionChip, ProgressIndicator } from "./OnboardingComponents";
import { OptionItem } from "@/data/onboardingData";

interface Step1Props {
    selectedLanguage: string;
    setSelectedLanguage: (lang: string) => void;
    onNext: () => void;
}

export const OnboardingStep1 = ({ selectedLanguage, setSelectedLanguage, onNext }: Step1Props) => (
    <div className="space-y-6">
        <ProgressIndicator step={1} />

        <div>
            <h2 className="text-2xl font-medium text-foreground mb-6">
                What is your language preference?
            </h2>

            <div className="grid grid-cols-3 gap-4 w-[22.5rem]">
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
            onClick={onNext}
            className="h-[46px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg rounded-xl w-[22.5rem]"
            disabled={!selectedLanguage}
        >
            Save and Proceed
        </Button>
    </div>
);

interface Step2Props {
    selectedRole: string;
    setSelectedRole: (role: string) => void;
    onRoleSelect: (role: string) => void;
    onNext: () => void;
}

export const OnboardingStep2 = ({ selectedRole, setSelectedRole, onRoleSelect, onNext }: Step2Props) => (
    <div className="space-y-8">
        <ProgressIndicator step={2} />

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
                            onRoleSelect(option.id);
                        }}
                        showIcon
                    />
                ))}
            </div>
        </div>

        <Button
            onClick={onNext}
            className="w-full max-w-md h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full"
            disabled={!selectedRole}
        >
            Save and Proceed
        </Button>
    </div>
);

interface Step3Props {
    selectedRole: string;
    currentSkills: OptionItem[];
    selectedSkills: string[];
    toggleSkill: (skillId: string) => void;
    showOtherInput: boolean;
    otherSkillText: string;
    setOtherSkillText: (text: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const OnboardingStep3 = ({
    selectedRole,
    currentSkills,
    selectedSkills,
    toggleSkill,
    showOtherInput,
    otherSkillText,
    setOtherSkillText,
    onSubmit,
    isLoading
}: Step3Props) => (
    <div className="space-y-8">
        <ProgressIndicator step={3} />

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
            onClick={onSubmit}
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
