import React, { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';

const IDENTIFIER_REGEX =
  /^([6-9]\d{9}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4})$/;

const ForgetPassword: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');

  const isFormValid =
    IDENTIFIER_REGEX.test(identifier.trim()) && name.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.warn('Continue', { identifier: identifier.trim(), name: name.trim() });
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Recover Account
        </h1>

        <div>
          <label className="block text-sm mb-1">
            Email ID / Mobile Number
          </label>
          <input
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
            }}
            placeholder="Enter Email ID / Mobile Number"
            className="w-full h-12 border rounded-md px-3"
          />
        </div>

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
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full bg-primary text-white rounded-md p-3 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;
