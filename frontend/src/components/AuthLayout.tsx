import React from 'react';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import authWaveBg from '@/assets/auth-wave-bg.png';

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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#4A8C8C] font-rubik">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full opacity-30 h-[40%]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#3D7A7A"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg className="absolute bottom-0 right-0 w-full opacity-20 h-[30%]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#2D6666"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-[#E0E0E0]">
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
          <img src={authWaveBg} alt="Wave background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute top-6 left-6 right-0 bottom-6 border-l-[3px] border-t-[3px] border-b-[3px] border-white/70 rounded-tl-[24px] rounded-bl-[24px] rounded-tr-[0] rounded-br-[0]" />
          <div className="absolute bottom-12 left-8 right-8 z-10">
            <h2 className="text-white text-[28px] leading-tight font-medium font-rubik">
              Empower your future<br />
              through learning.
            </h2>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col relative bg-white">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
          <div className="flex justify-center mb-6">
            <img src="https://sandbox.sunbirded.org/assets/images/sunbird_logo.png" alt="Sunbird" className="h-10" />
          </div>
          <div className="flex-1 flex flex-col justify-start">{children}</div>
        </div>
      </div>
    </div>
  );
};

export { AuthLayout };
