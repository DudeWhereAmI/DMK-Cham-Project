import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, ShieldCheck, ArrowRight } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface RegisterFormProps {
  lang: 'vi' | 'en';
  onNavigateLogin: () => void;
  onRegisterSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ lang, onNavigateLogin, onRegisterSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg(lang === 'vi' ? 'Mật khẩu xác nhận không khớp' : 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg(lang === 'vi' ? 'Mật khẩu phải có ít nhất 6 ký tự' : 'Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.name
      });

      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
        role: 'user'
      });

      onRegisterSuccess();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg(lang === 'vi' ? 'Email này đã được sử dụng' : 'This email is already in use');
      } else {
        setErrorMsg(err.message || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full bg-slate-50 border-2 border-transparent hover:bg-white hover:border-slate-300 focus:bg-white focus:border-[#00687A] rounded-none px-4 py-3 text-sm font-medium outline-none transition-all duration-300 text-slate-800 placeholder-slate-400";

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col-reverse md:flex-row overflow-hidden rounded-sm bg-white shadow-2xl">
      {/* Right Form Block */}
      <div className="flex-1 py-12 px-8 sm:px-12 relative bg-white">
        <div className="mb-10">
          <h1 className="font-sans font-black text-3xl uppercase tracking-widest text-[#00687A] mb-2">
            {lang === 'vi' ? 'TẠO TÀI KHOẢN' : 'REGISTER'}
          </h1>
          <div className="w-12 h-1 bg-[#E28C9A] mb-4"></div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            {lang === 'vi' ? 'Điền thông tin để đăng ký thành viên mới' : 'Enter your details to register a new account'}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 text-sm font-medium border-l-4 border-red-600">
              {errorMsg}
            </div>
          )}

          {/* Name Input */}
          <div className="flex flex-col gap-1.5 relative">
            <label className="font-bold text-[#00687A] text-xs uppercase tracking-wider">
              {lang === 'vi' ? 'Họ và tên' : 'Full Name'}
            </label>
            <div className="relative">
              <input 
                type="text" 
                className={`${inputStyle} pl-11`}
                placeholder={lang === 'vi' ? "Tên của bạn" : "Your name"}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5 relative">
            <label className="font-bold text-[#00687A] text-xs uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <input 
                type="email" 
                autoComplete="email"
                className={`${inputStyle} pl-11`}
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Password Input */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="font-bold text-[#00687A] text-xs uppercase tracking-wider">
                {lang === 'vi' ? 'Mật khẩu' : 'Password'}
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  autoComplete="new-password"
                  className={`${inputStyle} pl-11 pr-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00687A] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="font-bold text-[#00687A] text-xs uppercase tracking-wider">
                {lang === 'vi' ? 'Xác nhận' : 'Confirm'}
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  autoComplete="new-password"
                  className={`${inputStyle} pl-11 pr-10`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00687A] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E28C9A] hover:bg-[#d07b89] text-white font-bold text-sm uppercase tracking-widest py-4 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (lang === 'vi' ? 'ĐANG TẠO...' : 'CREATING...') : (lang === 'vi' ? 'ĐĂNG KÝ TÀI KHOẢN' : 'REGISTER ACCOUNT')}
              {!isSubmitting && <UserPlus className="w-4 h-4" />}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center font-medium text-slate-500 text-xs">
          {lang === 'vi' ? 'Bạn đã có tài khoản?' : "Already have an account?"}{' '}
          <button 
            onClick={onNavigateLogin}
            className="font-bold text-[#00687A] hover:text-[#E28C9A] transition-colors p-1 uppercase tracking-wider"
          >
            {lang === 'vi' ? 'Đăng nhập ngay' : 'Sign in now'}
          </button>
        </div>
      </div>

      {/* Left Aesthetic Block */}
      <div className="hidden md:flex flex-1 bg-[#FBF5F2] relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00687A 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E28C9A] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#00687A] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-center">
          <ShieldCheck className="w-10 h-10 text-[#00687A] mb-6 opacity-80" />
          <h2 className="text-3xl font-serif text-[#00687A] leading-tight">
            {lang === 'vi' ? 'Gia nhập thế giới của Chạm.' : 'Join the world of Chạm.'}
          </h2>
          <p className="text-[#00687A]/70 mt-4 text-sm max-w-xs font-serif italic">
            {lang === 'vi' ? 'Tạo tài khoản để cá nhân hóa và lưu giữ thiết kế độc bản của bạn.' : 'Create an account to personalize and save your unique designs.'}
          </p>
        </div>
        
        <div className="relative z-10 mt-auto">
          <div className="w-16 h-1 bg-[#00687A] mb-4"></div>
          <p className="text-[#00687A]/50 text-xs tracking-widest uppercase font-bold">Chạm Elements &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};
