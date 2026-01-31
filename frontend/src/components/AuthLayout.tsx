import React from 'react';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import authWaveBg from '@/assets/auth-wave-bg.png';
import sunbirdLogo from '@/assets/sunbird-logo.png';

interface AuthLayoutProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 font-rubik bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${authWaveBg})` }}
    >
      {/* Card */}
      {/* Card (transparent container) */}
      <div
        className="
    relative
    w-full
    max-w-[1100px]
    h-[740px]
    rounded-3xl
    shadow-2xl
    overflow-hidden
    flex
  "
      >
        {/* Left Panel (transparent window) */}
        <div className="hidden md:flex w-[420px] relative rounded-l-3xl overflow-hidden">
          {/* Inner white border */}
          <div className="absolute inset-4 border-2 border-white/70 rounded-2xl" />

          {/* Bottom text */}
          <div className="absolute bottom-10 left-10 z-10">
            <h2 className="text-white text-[28px] leading-tight font-medium">
              Empower your future<br />
              through learning.
            </h2>
          </div>
        </div>

        {/* Right Panel (white surface) */}
        <div className="flex-1 relative flex flex-col justify-center bg-white rounded-r-3xl px-10 md:px-14">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="mx-auto w-full max-w-sm">
            <div className="flex justify-center mb-8">
              <a href="/">
                <img
                  src={sunbirdLogo}
                  alt="Sunbird"
                  className="h-10 w-auto"
                />
              </a>
            </div>

            {children}
          </div>
        </div>
      </div>

    </div>
  );
};

export { AuthLayout };
