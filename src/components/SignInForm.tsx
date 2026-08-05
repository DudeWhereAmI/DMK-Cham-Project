import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface SignInFormProps {
  lang: 'vi' | 'en';
  onNavigateRegister: () => void;
  onLoginSuccess: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ lang, onNavigateRegister, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const inputStyle = "w-full bg-slate-50 border-2 border-transparent hover:bg-white hover:border-slate-300 focus:bg-white focus:border-[#00687A] rounded-none px-4 py-3.5 text-sm font-medium outline-none transition-all duration-300 text-slate-800 placeholder-slate-400";

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row overflow-hidden rounded-sm bg-white shadow-2xl">
      {/* Left Aesthetic Block */}
      <div className="hidden md:flex flex-1 bg-[#00687A] relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FBF5F2 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#E28C9A] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FBF5F2] rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10">
          <ShieldCheck className="w-10 h-10 text-[#FBF5F2] mb-6 opacity-80" />
          <h2 className="text-3xl font-serif text-[#FBF5F2] leading-tight">
            {lang === 'vi' ? 'Chào mừng bạn trở lại với Chạm.' : 'Welcome back to Chạm.'}
          </h2>
          <p className="text-[#FBF5F2]/70 mt-4 text-sm max-w-xs font-serif italic">
            {lang === 'vi' ? 'Khám phá và tiếp tục hành trình lưu giữ những câu chuyện của riêng bạn.' : 'Discover and continue the journey of preserving your own stories.'}
          </p>
        </div>
        
        <div className="relative z-10">
          <div className="w-16 h-1 bg-[#E28C9A] mb-4"></div>
          <p className="text-[#FBF5F2]/50 text-xs tracking-widest uppercase font-bold">Chạm Elements &copy; {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Right Form Block */}
      <div className="flex-1 py-12 px-8 sm:px-12 relative bg-white">
        {/* Header section */}
        <div className="mb-10">
          <h1 className="font-sans font-black text-3xl uppercase tracking-widest text-[#00687A] mb-2">
            {lang === 'vi' ? 'ĐĂNG NHẬP' : 'SIGN IN'}
          </h1>
          <div className="w-12 h-1 bg-[#E28C9A] mb-4"></div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            {lang === 'vi' ? 'Điền thông tin để truy cập tài khoản' : 'Enter your details to access your account'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleEmailLogin}>
          
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 text-sm font-medium border-l-4 border-red-600">
              {errorMsg}
            </div>
          )}

          {/* Email Input */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-bold text-[#00687A] text-xs uppercase tracking-wider">
              {lang === 'vi' ? 'Email / Tên người dùng' : 'Email / Username'}
            </label>
            <div className="relative">
              <input 
                type="text" 
                autoComplete="username"
                className={`${inputStyle} pl-11`}
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-end">
              <label className="font-bold text-[#00687A] text-xs uppercase tracking-wider">
                {lang === 'vi' ? 'Mật khẩu' : 'Password'}
              </label>
              <a href="#" className="font-semibold text-xs text-slate-400 hover:text-[#00687A] transition-colors underline decoration-slate-300 underline-offset-4">
                {lang === 'vi' ? 'Quên?' : 'Forgot?'}
              </a>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                autoComplete="current-password"
                className={`${inputStyle} pl-11 pr-12`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00687A] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00687A] hover:bg-[#00485A] text-white font-bold text-sm uppercase tracking-widest py-4 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (lang === 'vi' ? 'ĐANG XỬ LÝ...' : 'PROCESSING...') : (lang === 'vi' ? 'ĐĂNG NHẬP' : 'SIGN IN')}
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>

        {/* Or Divider */}
        <div className="flex items-center gap-4 my-8 opacity-60">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="font-bold text-[10px] uppercase text-slate-500 tracking-widest">
            {lang === 'vi' ? 'Hoặc đăng nhập với' : 'Or sign in with'}
          </span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors py-3 px-4 font-bold text-xs text-slate-700 tracking-wide uppercase">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] transition-colors py-3 px-4 font-bold text-xs text-white tracking-wide uppercase">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.326v21.348C0 23.402.598 24 1.325 24h11.495v-9.294h-3.128v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.598 1.323-1.326V1.326C24 .598 23.402 0 22.675 0z" />
            </svg>
            Facebook
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center font-medium text-slate-500 text-xs">
          {lang === 'vi' ? 'Bạn chưa có tài khoản?' : "Don't have an account?"}{' '}
          <button 
            onClick={onNavigateRegister}
            className="font-bold text-[#00687A] hover:text-[#E28C9A] transition-colors p-1 uppercase tracking-wider"
          >
            {lang === 'vi' ? 'Tạo tài khoản' : 'Create one'}
          </button>
        </div>
      </div>
    </div>
  );
};
