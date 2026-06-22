import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PngLogoCircular } from './PngLogo';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

interface SignInFormProps {
  lang: 'vi' | 'en';
  onNavigateRegister: () => void;
  onLoginSuccess: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ lang, onNavigateRegister, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const inputStyle = "w-full bg-slate-50 border-2 border-transparent hover:bg-white hover:border-white hover:shadow-[0_0_0_4px_white,0_8px_24px_rgba(0,0,0,0.06)] focus:bg-white focus:border-white focus:shadow-[0_0_0_4px_white,0_8px_24px_rgba(0,104,122,0.15)] rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-all duration-500 text-slate-800 placeholder-slate-400";

  return (
    <div className="w-full max-w-md mx-auto py-12 px-6">
      
      {/* Header section with brand typography */}
      <div className="text-center mb-8">
        <h1 className="font-sans font-black text-3xl uppercase tracking-widest text-[#00687A] mb-4">
          {lang === 'vi' ? 'ĐĂNG NHẬP' : 'SIGN IN'}
        </h1>
        <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm mx-auto">
          {lang === 'vi' ? 'Sử dụng địa chỉ email hoặc tên người dùng để đăng nhập vào tài khoản của bạn' : 'Use your email address or username to sign into your account'}
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        
        {/* Email Input */}
        <div className="flex flex-col gap-1.5 relative group/input">
          <label className="font-bold text-[#00687A] text-sm tracking-wide ml-1">
            {lang === 'vi' ? 'Email / Tên người dùng' : 'Email (adult) / Username (junior)'}
          </label>
          <div className="relative rounded-xl bg-slate-100 p-1">
            <input 
              type="text" 
              autoComplete="username"
              className={inputStyle}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1.5 relative group/input">
          <label className="font-bold text-[#00687A] text-sm tracking-wide ml-1">
            {lang === 'vi' ? 'Mật khẩu' : 'Password'}
          </label>
          <div className="relative rounded-xl bg-slate-100 p-1">
            <input 
              type={showPassword ? "text" : "password"} 
              autoComplete="current-password"
              className={`${inputStyle} pr-12`}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00687A] transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="mt-2 ml-1">
            <a href="#" className="font-medium text-xs text-slate-400 hover:text-[#00687A] transition-colors underline decoration-slate-300 underline-offset-4">
              {lang === 'vi' ? 'Quên mật khẩu?' : 'Forgotten Password?'}
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button 
            type="submit"
            className="w-full bg-[#8A1538] hover:bg-[#00687A] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            {lang === 'vi' ? 'ĐĂNG NHẬP' : 'SIGN IN'}
          </button>
        </div>

      </form>

      {/* Or Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="font-bold text-xs uppercase text-slate-800 tracking-widest">
          {lang === 'vi' ? 'HOẶC' : 'OR'}
        </span>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>

      {/* Social Logins */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button type="button" onClick={handleGoogleLogin} className="flex-1 flex items-center justify-center gap-2 bg-[#EFEFEF] hover:bg-[#E28C9A]/10 hover:text-[#00687A] transition-colors rounded-full py-2.5 px-4 font-medium text-sm text-slate-700">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
        <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#EFEFEF] hover:bg-[#E28C9A]/10 hover:text-[#00687A] transition-colors rounded-full py-2.5 px-4 font-medium text-sm text-slate-700">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.326v21.348C0 23.402.598 24 1.325 24h11.495v-9.294h-3.128v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.598 1.323-1.326V1.326C24 .598 23.402 0 22.675 0z" />
          </svg>
          Facebook
        </button>
        <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#EFEFEF] hover:bg-[#E28C9A]/10 hover:text-[#00687A] transition-colors rounded-full py-2.5 px-4 font-medium text-sm text-slate-700">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.86 3.6-.8 1.54.06 2.8.69 3.69 1.8-3.13 1.84-2.65 6.13.25 7.37-.73 1.5-1.58 2.86-2.62 3.8zM12.03 7.25c-.24-2.92 2.3-5.5 5.14-5.69.32 3.12-2.8 5.74-5.14 5.69z" />
          </svg>
          Apple
        </button>
      </div>

      <div className="mt-10 text-center font-medium text-slate-500 text-sm">
        {lang === 'vi' ? 'Bạn chưa có tài khoản?' : "Don't have an account?"}{' '}
        <button 
          onClick={onNavigateRegister}
          className="font-bold text-[#00687A] hover:underline decoration-[#E28C9A] underline-offset-4 cursor-pointer p-1"
        >
          {lang === 'vi' ? 'Đăng ký tại đây' : 'Register here'}
        </button>
      </div>

    </div>
  );
};
