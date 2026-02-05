import React from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Checkbox } from "@/components/checkbox";
import { Header, InputLabel, PrimaryButton } from "./AuthComponents";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IDENTIFIER_REGEX, PASSWORD_REGEX } from "@/lib/auth-utils";

interface Step1Props {
    emailOrMobile: string;
    setEmailOrMobile: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    confirmPassword: string;
    setConfirmPassword: (val: string) => void;
    isTermsAccepted: boolean;
    setIsTermsAccepted: (val: boolean) => void;
    showPassword: boolean;
    setShowPassword: (val: React.SetStateAction<boolean>) => void;
    showConfirmPassword: boolean;
    setShowConfirmPassword: (val: React.SetStateAction<boolean>) => void;
    handleContinue: () => void;
    isStep1Valid: boolean;
}

export const SignUpStep1 = ({
    emailOrMobile, setEmailOrMobile,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    isTermsAccepted, setIsTermsAccepted,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    handleContinue,
    isStep1Valid
}: Step1Props) => (
    <>
        <Header
            title="Welcome to Sunbird!"
            subtitle="Your learning journey starts here–log in to continue."
            className="mb-4"
        />

        <div className="auth-form-group">
            {/* Google Sign In */}
            <Button
                variant="outline"
                className="auth-google-btn"
                onClick={() => console.log('Google Sign In')}
            >
                <FcGoogle className="w-5 h-5" />
                Sign in with Google
            </Button>

            {/* Divider */}
            <div className="auth-divider">
                <div className="auth-divider-line"></div>
                <span className="auth-divider-text">OR</span>
                <div className="auth-divider-line"></div>
            </div>

            {/* Form Fields */}
            <div className="auth-form-group">
                {/* Email / Mobile */}
                <div className="form-group">
                    <InputLabel required className="mb-1">Email ID / Mobile Number</InputLabel>
                    <Input
                        value={emailOrMobile}
                        onChange={(e) => setEmailOrMobile(e.target.value)}
                        placeholder="Enter Email ID / Mobile Number"
                        className="auth-input"
                    />
                    {/* Inline Error (Optional/Complementary) */}
                    {emailOrMobile && !IDENTIFIER_REGEX.test(emailOrMobile) && (
                        <p className="text-[0.75rem] text-red-500 mt-1">
                            Enter valid Email or 10-digit Mobile (6-9)
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="form-group">
                    <InputLabel required className="mb-1">Password</InputLabel>
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="auth-input pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="auth-password-toggle"
                        >
                            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
                {/* Password Requirements */}
                {password && !PASSWORD_REGEX.test(password) && (
                    <p className="text-[0.75rem] text-red-500 mt-1">
                        Password must be 8+ chars with upper, lower, number & special character
                    </p>
                )}

                {/* Confirm Password */}
                <div className="form-group">
                    <InputLabel required className="mb-1">Confirm Password</InputLabel>
                    <div className="relative">
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter Password"
                            className="auth-input pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            className="auth-password-toggle"
                        >
                            {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                        <p className="text-[0.75rem] text-red-500 mt-1">
                            Passwords do not match
                        </p>
                    )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start items-center space-x-2 mt-1">
                    <Checkbox
                        id="terms"
                        checked={isTermsAccepted}
                        onCheckedChange={(checked) => setIsTermsAccepted(checked === true)}
                        className="data-[state=checked]:bg-[#A85236] data-[state=checked]:border-[#A85236] border-[#828282] w-4 h-4 rounded-[0.25rem]"
                    />
                    <label
                        htmlFor="terms"
                        className="text-[0.75rem] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#333333]"
                    >
                        I understand & <a href="#" className="font-bold text-[#A85236] underline">accept the SUNBIRD Terms of Use</a>.
                    </label>
                </div>

                <PrimaryButton
                    disabled={!isStep1Valid}
                    onClick={handleContinue}
                    className="mt-4 h-[3rem]"
                >
                    Continue
                </PrimaryButton>

                <div className="text-center mt-3 text-[0.75rem] text-[#333333] font-medium">
                    Already have an account? <a href="/login" className="text-[#A85236] font-bold hover:underline">Login</a>
                </div>
            </div>
        </div>
    </>
);

interface Step2Props {
    otp: string[];
    setOtp: (val: string[]) => void;
    isOtpValid: boolean;
    handleVerifyOtp: () => void;
}

export const SignUpStep2 = ({ otp, setOtp, isOtpValid, handleVerifyOtp }: Step2Props) => (
    <>
        <Header
            title="Enter the code"
            subtitle="Enter the 6 digit code sent to your Email ID and complete the verification"
        />

        <div className="space-y-5">
            <div className="space-y-6">
                <p className="otp-validity-text">
                    OTP is valid for 30 minutes
                </p>

                <div className="otp-inputs-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            className="otp-input-field"
                            value={digit}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                // If deleting
                                if (!val && !e.target.value) {
                                    const newOtp = [...otp];
                                    newOtp[index] = '';
                                    setOtp(newOtp);
                                    return;
                                }

                                if (val) {
                                    const newOtp = [...otp];
                                    newOtp[index] = val;
                                    setOtp(newOtp);
                                    if (index < 5) {
                                        document.getElementById(`otp-${index + 1}`)?.focus();
                                    }
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Backspace' && !otp[index] && index > 0) {
                                    document.getElementById(`otp-${index - 1}`)?.focus();
                                }
                            }}
                        />
                    ))}
                </div>

                <div className="otp-resend-container">
                    <span>04:00 </span>
                    <button className="otp-resend-btn">
                        Resend OTP
                    </button>
                </div>
            </div>

            <PrimaryButton
                disabled={!isOtpValid}
                onClick={handleVerifyOtp}
            >
                Submit
            </PrimaryButton>
        </div>
    </>
);
