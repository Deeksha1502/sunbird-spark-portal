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
      className="login-wrapper font-rubik min-h-screen w-full flex items-center justify-center relative bg-[#4A8C8C] bg-cover bg-center bg-fixed overflow-x-hidden"
      style={{ backgroundImage: `url(${authWaveBg})` }}
    >
      {/* Unified White Container */}
      <div className="login-split-container flex flex-col md:flex-row w-full max-w-7xl min-h-[730px] m-[10px] md:m-auto bg-white rounded-[3rem] p-[6px] relative z-10 shadow-2xl">

        {/* Inset Left Panel */}
        <div
          className="login-left-panel hidden md:flex flex-1 relative items-center justify-center overflow-hidden rounded-[2.5rem] bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${authWaveBg})` }}
        >
          {/* The visible white frame inset */}
          <div className="login-left-panel-container absolute inset-0 z-[3] border-0 rounded-[2.5rem] shadow-[0_0_0_2rem_rgba(255,255,255,0.05)]"></div>
          <div className="left-panel-content absolute z-[2] left-10 bottom-10 max-w-[calc(100%-80px)]">
            <h2 className="left-panel-title !font-rubik text-[30px] font-semibold text-white leading-[42px]">
              Empower your future<br />
              through learning.
            </h2>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="login-card flex-1 p-6 md:p-12 relative flex flex-col justify-center">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="close-button absolute top-5 right-5 p-2 text-[#333333] hover:opacity-70 transition-opacity z-20"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="mx-auto w-full max-w-sm flex flex-col justify-center">
            <div className="login-header text-center mb-8">
              <div className="sunbird-logo mb-5">
                <a href="/">
                  <img
                    src={sunbirdLogo}
                    alt="Sunbird Logo"
                    className="h-10 w-auto mx-auto"
                  />
                </a>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AuthLayout };
