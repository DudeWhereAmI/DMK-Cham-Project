
import React from 'react';
import { Sparkles, UserPlus, LogIn } from 'lucide-react';
import { PngLogoCircular } from './PngLogo';

interface TouchpointPageProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
  lang: 'vi' | 'en';
}

export const TouchpointPage: React.FC<TouchpointPageProps> = ({
  onNavigateHome,
  onNavigateLogin,
  onNavigateRegister,
  lang
}) => {
  return (
    <div className="min-h-[90vh] bg-transparent flex flex-col relative overflow-hidden font-sans items-center justify-center">
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 text-center max-w-lg mx-auto w-full">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 bg-[#E28C9A] blur-[120px] opacity-10 rounded-full pointer-events-none" />

        {/* Collection Hero Image */}
        <div className="mb-8 relative animate-fade-in w-full max-w-sm md:max-w-md mx-auto" style={{ animationFillMode: 'forwards' }}>
          <img 
            src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/new/pha%20l%C3%AA%20ch%E1%BB%AF%20d%C3%A1n%205%20m%C3%A0u.png" 
            alt="Chạm Collection" 
            className="w-full h-auto object-contain drop-shadow-2xl opacity-100 mx-auto animate-float mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Welcome Text */}
        <div className="space-y-6 mb-16 animate-fade-in translate-y-4" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <h1 className="text-xl md:text-2xl font-sans font-medium text-[#00687A]/80 uppercase tracking-[0.2em] leading-relaxed mb-4 text-balance">
            {lang === 'vi' ? 'Chào mừng bạn đến với' : 'Welcome to'} 
            <span className="font-serif font-semibold tracking-[0.15em] uppercase text-4xl md:text-5xl mt-6 mb-2 block text-[#00687A]">CHẠM ELEMENTS</span>
          </h1>
          <p className="text-[#00687A]/70 font-serif text-base md:text-lg max-w-sm mx-auto tracking-wide text-balance">
            {lang === 'vi' 
              ? '"Nơi lưu giữ những câu chuyện của riêng bạn qua từng vòng trang&nbsp;sức."' 
              : '"Where your unique stories are captured in every piece of&nbsp;jewelry."'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4 animate-fade-in translate-y-4" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <button 
            onClick={onNavigateHome}
            className="w-full bg-[#E28C9A] text-white font-sans font-bold uppercase tracking-widest py-4 px-6 rounded-xl flex items-center justify-center gap-3 hover:bg-[#00687A] active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            <span>{lang === 'vi' ? 'Khám Phá Ngay' : 'Explore Now'}</span>
            <Sparkles className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onNavigateRegister}
              className="bg-white/50 backdrop-blur-sm text-[#00687A] font-sans font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white active:scale-95 transition-all shadow-sm border border-[#00687A]/10"
            >
              <UserPlus className="w-4 h-4 opacity-70" />
              <span className="text-[11px]">{lang === 'vi' ? 'Đăng Ký' : 'Register'}</span>
            </button>
            <button 
              onClick={onNavigateLogin}
              className="bg-white/50 backdrop-blur-sm text-[#00687A] font-sans font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white active:scale-95 transition-all shadow-sm border border-[#00687A]/10"
            >
              <LogIn className="w-4 h-4 opacity-70" />
              <span className="text-[11px]">{lang === 'vi' ? 'Đăng Nhập' : 'Log In'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
