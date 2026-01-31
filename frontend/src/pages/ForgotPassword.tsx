import React, { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import {
  IDENTIFIER_REGEX,
  OTP_REGEX,
  PASSWORD_REGEX,
  maskIdentifier
} from '@/lib/auth-utils';
import { FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const maskedIdentifier = maskIdentifier(identifier.trim());

  /* ---------- VALIDATIONS ---------- */
  const isRecoverValid =
    IDENTIFIER_REGEX.test(identifier.trim()) && name.trim().length > 0;

  const isOtpValid = OTP_REGEX.test(otp.join(''));

  const isPasswordValid = PASSWORD_REGEX.test(password);
  const isConfirmValid = password === confirmPassword && confirmPassword.length > 0;

  /* ---------- SUB-COMPONENTS ---------- */
  const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );

  return (
    <AuthLayout>
      <div className="w-full space-y-6">

        {/* STEP 1: Identification */}
        {step === 1 && (
          <>
            <Header title="Forgot Password" />

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email ID / Mobile Number
                </label>
                <Input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter Email ID / Mobile Number"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Name (as registered)
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>

              <Button
                className="w-full"
                disabled={!isRecoverValid}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {/* STEP 2: Delivery Option */}
        {step === 2 && (
          <>
            <Header
              title="Forgot Password"
              subtitle="You will receive an OTP. After you validate it, you can recover your account."
            />

            <div className="space-y-6">
              <p className="text-sm font-medium text-center">
                Where would you like to receive the OTP?
              </p>

              <div className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50">
                <input type="radio" checked readOnly className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{maskedIdentifier}</span>
              </div>

              <Button
                className="w-full"
                onClick={() => setStep(3)}
              >
                Get OTP
              </Button>
            </div>
          </>
        )}

        {/* STEP 3: OTP Verification */}
        {step === 3 && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-[28px] font-bold text-gray-900 mb-2">Enter the code</h1>
              <p className="text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed">
                Enter the 6 digit code sent to your phone number and complete the verification
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-medium text-center text-gray-700">
                  OTP is valid for 30 minutes
                </p>

                <div className="flex justify-center gap-2 sm:gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      className="w-10 h-10 sm:w-12 sm:h-12 border border-[#A0522D] rounded-md text-center text-xl font-medium focus:outline-none focus:ring-1 focus:ring-[#A0522D]"
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

                <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-700">
                  <span>04:00</span>
                  <button className="text-[#A0522D] hover:underline">
                    Resend OTP
                  </button>
                </div>
              </div>

              <Button
                className="w-full h-12 text-base bg-[#A0522D] hover:bg-[#8B4513] text-white rounded-xl"
                disabled={!isOtpValid}
                onClick={() => setStep(4)}
              >
                Confirm and Proceed
              </Button>
            </div>
          </>
        )}

        {/* STEP 4: Reset Password */}
        {step === 4 && (
          <>
            <Header title="Create New Password" />

            <div className="space-y-4">
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {!isPasswordValid && password && (
                  <p className="text-xs text-red-500">
                    Password must be 8+ chars with upper, lower, number & special character
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500">
                    Passwords do not match
                  </p>
                )}
              </div>

              <Button
                className="w-full"
                disabled={!isPasswordValid || !isConfirmValid}
                onClick={() => setStep(5)}
              >
                Reset Password
              </Button>
            </div>
          </>
        )}

        {/* STEP 5: Success */}
        {step === 5 && (
          <div className="flex flex-col items-center">

            <Header
              title="Congratulations!"
              subtitle="Your password has been successfully reset."
            />

            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
                <FiCheck className="text-white text-4xl" />
              </div>
            </div>

            <Button
              className="w-full bg-[#A0522D] hover:bg-[#8B4513] text-white"
              onClick={() => {
                window.location.href = '/login';
              }}
            >
              Proceed to Login
            </Button>
          </div>
        )}

      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
