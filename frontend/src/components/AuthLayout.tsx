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
      className="login-wrapper min-h-screen w-full flex items-center justify-center relative bg-[#4A8C8C] bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: `url(${authWaveBg})` }}
    >
      {/* Split Screen Container */}
      <div className="login-split-container flex flex-col md:flex-row w-full max-w-5xl min-h-[max(520px,calc(100vh-80px))] m-[10px] md:m-auto rounded-[3rem] overflow-hidden relative z-10 shadow-2xl">

        {/* Left Panel */}
        <div className="login-left-panel hidden md:flex flex-1 relative items-center justify-center overflow-hidden border-2 border-white/20 rounded-[3rem_0_0_3rem]">
          <div className="login-left-panel-container absolute inset-0 z-[3] border-[3px] border-white/10 rounded-[3rem] shadow-[0_0_0_2rem_rgba(255,255,255,0.05)]"></div>
          <div className="left-panel-content absolute z-[2] left-6 bottom-6 max-w-[calc(100%-48px)]">
            <h2 className="left-panel-title text-[30px] font-semibold text-white leading-[42px]">
              Empower your future<br />
              through learning.
            </h2>
          </div>
        </div>

        {/* Right Panel - Login Card */}
        <div className="login-right-panel flex-1 bg-white relative rounded-[3rem] md:rounded-[0_3rem_3rem_0] shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center justify-center">
          <div className="login-card w-full h-full p-6 md:p-12 relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="close-button absolute top-5 right-5 p-2 text-[#333333] hover:opacity-70 transition-opacity z-20"
            >
              <FiX className="w-6 h-6" />
            </button>

            <div className="mx-auto w-full max-w-sm flex flex-col h-full justify-center">
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
    </div>
  );
};

export { AuthLayout };
