import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { AuthLayout } from '@/components/AuthLayout';
import { fuzzyUserSearch } from '../api/forgotPassword';

type IdentifierStatus = 'MATCHED' | 'NOT_MATCHED' | 'VALIDATING_FAILED' | '';

const IDENTIFIER_REGEX =
  /^([6-9]\d{9}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4})$/;

const MAX_RETRY = 2;

const ForgetPassword: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [identifierStatus, setIdentifierStatus] =
    useState<IdentifierStatus>('');
  const [nameNotExist, setNameNotExist] = useState(false);

  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const isFormValid =
    IDENTIFIER_REGEX.test(identifier.trim()) && name.trim().length > 0;

  /**
   * 🔁 After captcha resolves → continue submission
   * (same as ng-recaptcha resolved event)
   */
  useEffect(() => {
    if (captchaToken) {
      submitWithCaptcha(captchaToken);
    }
  }, [captchaToken]);

  /**
   * STEP 1: User clicks Next
   */
  const handleSubmit = () => {
    if (!isFormValid || loading) return;

    setIdentifierStatus('');
    setNameNotExist(false);

    // Trigger invisible captcha
    captchaRef.current?.execute();
  };

  /**
   * STEP 2: API call after captcha verification
   */
  const submitWithCaptcha = async (token: string) => {
    try {
      setLoading(true);

      const response = await fuzzyUserSearch(
        {
          identifier: identifier.trim(),
          name: name.trim(),
        },
        token
      );

      const count = response?.data?.result?.response?.count ?? 0;

      if (count > 0) {
        // ✅ SUCCESS → navigate to next step
        console.log('Account identified successfully');
      } else {
        setIdentifierStatus('NOT_MATCHED');
        setNameNotExist(true);
      }
    } catch (err: any) {
      setErrorCount((prev) => {
        const next = prev + 1;

        if (next >= MAX_RETRY) {
          window.location.href =
            '/error?message=You have exceeded maximum retry. Please try after some time';
        }

        return next;
      });

      if (err?.responseCode === 'PARTIAL_SUCCESS_RESPONSE') {
        setIdentifierStatus('MATCHED');
        setNameNotExist(true);
      } else if (err?.status === 418) {
        setIdentifierStatus('VALIDATING_FAILED');
      } else {
        setIdentifierStatus('NOT_MATCHED');
        setNameNotExist(true);
      }

      captchaRef.current?.reset();
    } finally {
      setCaptchaToken(null); // 🔐 single-use token
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Recover Account
        </h1>

        {/* Identifier */}
        <div>
          <label className="block text-sm mb-1">
            Email ID / Mobile Number
          </label>
          <input
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setIdentifierStatus('');
            }}
            placeholder="Enter Email ID / Mobile Number"
            className="w-full h-12 border rounded-md px-3"
          />

          {identifierStatus === 'MATCHED' && (
            <p className="text-green-600 text-sm mt-1">
              Identifier verified
            </p>
          )}

          {identifierStatus === 'NOT_MATCHED' && (
            <p className="text-red-600 text-sm mt-1">
              Email / Phone not registered
            </p>
          )}

          {identifierStatus === 'VALIDATING_FAILED' && (
            <p className="text-red-600 text-sm mt-1">
              CAPTCHA validation failed
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm mb-1">
            Name (as registered)
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full h-12 border rounded-md px-3"
          />

          {nameNotExist && (
            <p className="text-red-600 text-sm mt-1">
              Entered name does not match
            </p>
          )}
        </div>

        {/* Invisible reCAPTCHA */}
        <ReCAPTCHA
          ref={captchaRef}
          size="invisible"
          sitekey={
            import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
            '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
          }
          onChange={(token) => setCaptchaToken(token)}
          onExpired={() => captchaRef.current?.reset()}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="w-full bg-primary text-white rounded-md p-3 disabled:opacity-50"
        >
          {loading ? 'Verifying…' : 'Next'}
        </button>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;
