import React from 'react';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import sunbirdLogo from '@/assets/sunbird-logo.svg';

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
    <div className="login-wrapper">
      {/* Unified White Container */}
      <div className="login-split-container">

        {/* Inset Left Panel */}
        <div className="login-left-panel">
          {/* The visible white frame inset */}
          <div className="login-left-panel-border"></div>
          <div className="login-left-panel-content">
            <h2 className="login-left-panel-title">
              Empower your future<br />
              through learning.
            </h2>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="login-content-area">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="login-close-button">
            <FiX className="w-6 h-6" />
          </button>

          <div className="mx-auto w-full max-w-sm flex flex-col justify-start">
            <div className="logo-container text-center mb-0">
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
