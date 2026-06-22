import React, { useState, useEffect } from 'react';
import { PngLogoCircular } from './PngLogo';
import { Eye, EyeOff, ChevronLeft, Mail, Check } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

interface RegisterFormProps {
  lang: 'vi' | 'en';
  onNavigateLogin: () => void;
  onLoginSuccess: () => void;
}

type FormStep = 'selection' | 'dob' | 'basics' | 'verify' | 'success' | 'newsletter';

export const RegisterForm: React.FC<RegisterFormProps> = ({ lang, onNavigateLogin, onLoginSuccess }) => {
  const [step, setStep] = useState<FormStep>('selection');
  const [showPassword, setShowPassword] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-advance mock verify
  useEffect(() => {
    if (step === 'verify') {
      const timer = setTimeout(() => {
        setStep('success');
      }, 4000); // 4 seconds mock verification
      return () => clearTimeout(timer);
    }
  }, [step]);

  const TopNav = ({ onBack, stepIndex }: { onBack: () => void, stepIndex: number }) => (
    <div className="flex items-center mb-8 relative w-full pt-2">
       <button onClick={onBack} className="absolute left-0 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-700">
         <ChevronLeft className="w-5 h-5" />
       </button>
       <div className="flex-1 flex justify-center w-full">
         <div className="flex items-center gap-1.5 w-full max-w-[200px] md:max-w-[240px]">
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= stepIndex ? 'bg-[#b89552]' : 'bg-slate-200'}`} />
           ))}
         </div>
       </div>
    </div>
  );

  const inputStyle = "w-full bg-slate-50 border-2 border-transparent hover:bg-white hover:border-white hover:shadow-[0_0_0_4px_white,0_8px_24px_rgba(0,0,0,0.06)] focus:bg-white focus:border-white focus:shadow-[0_0_0_4px_white,0_8px_24px_rgba(0,104,122,0.15)] rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-all duration-500 text-slate-800 placeholder-slate-400";

  return (
    <div className="w-full max-w-md mx-auto py-12 px-6">
      
      {step === 'selection' && (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col items-center mb-8">
            <PngLogoCircular className="h-16 md:h-20 w-auto mb-6 drop-shadow-sm" />
            <h1 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-widest text-[#00687A] mb-3 text-center">
              {lang === 'vi' ? 'ĐĂNG KÝ TÀI KHOẢN CHẠM' : 'REGISTER FOR CHẠM'}
            </h1>
            <p className="text-slate-500 font-medium text-sm leading-relaxed text-center px-4">
              {lang === 'vi' ? 'Chọn cách bạn muốn đăng ký' : 'Choose how you would like to register'}
            </p>
          </div>

          <div className="space-y-6">
            <button 
              type="button"
              onClick={() => setStep('dob')}
              className="w-full bg-[#8A1538] hover:bg-[#00687A] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              {lang === 'vi' ? 'ĐĂNG KÝ BẰNG EMAIL' : 'REGISTER WITH EMAIL'}
            </button>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="font-bold text-xs uppercase text-slate-800 tracking-widest">
                {lang === 'vi' ? 'HOẶC' : 'OR'}
              </span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Google */}
              <button type="button" onClick={handleGoogleLogin} className="flex-1 flex items-center justify-center gap-2 bg-[#EFEFEF] hover:bg-[#E28C9A]/10 hover:text-[#00687A] transition-colors rounded-full py-2.5 px-4 font-medium text-sm text-slate-700">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              {/* Facebook */}
              <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#EFEFEF] hover:bg-[#E28C9A]/10 hover:text-[#00687A] transition-colors rounded-full py-2.5 px-4 font-medium text-sm text-slate-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.326v21.348C0 23.402.598 24 1.325 24h11.495v-9.294h-3.128v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.598 1.323-1.326V1.326C24 .598 23.402 0 22.675 0z" />
                </svg>
                Facebook
              </button>
              {/* Apple */}
              <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#EFEFEF] hover:bg-[#E28C9A]/10 hover:text-[#00687A] transition-colors rounded-full py-2.5 px-4 font-medium text-sm text-slate-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.86 3.6-.8 1.54.06 2.8.69 3.69 1.8-3.13 1.84-2.65 6.13.25 7.37-.73 1.5-1.58 2.86-2.62 3.8zM12.03 7.25c-.24-2.92 2.3-5.5 5.14-5.69.32 3.12-2.8 5.74-5.14 5.69z" />
                </svg>
                Apple
              </button>
            </div>

            <div className="mt-10 text-center font-medium text-slate-500 text-sm">
              {lang === 'vi' ? 'Bạn đã có tài khoản?' : "Already have an account?"}{' '}
              <button 
                onClick={onNavigateLogin}
                className="font-bold text-[#00687A] hover:underline decoration-[#E28C9A] underline-offset-4 cursor-pointer p-1"
              >
                {lang === 'vi' ? 'Đăng nhập' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'dob' && (
        <div className="flex flex-col animate-in slide-in-from-right-4 fade-in duration-300">
          <TopNav onBack={() => setStep('selection')} stepIndex={1} />
          
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[28px] font-sans font-medium text-slate-900 mb-3 tracking-tight leading-tight">
              {lang === 'vi' ? 'Để hiểu rõ nhau hơn... Ngày sinh của bạn là?' : "A quick one to kick off... What's your date of birth?"}
            </h2>
            <p className="text-slate-500 text-base">
              {lang === 'vi' ? 'Điều này giúp chúng tôi cá nhân hóa trải nghiệm của bạn.' : 'This helps us tailor your experience to you.'}
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setStep('basics'); }} className="flex flex-col gap-8 h-full min-h-[300px] justify-between">
            <div className="flex flex-col gap-1.5 relative group/input">
              <label className="font-bold text-slate-900 text-[15px] tracking-wide ml-1">
                {lang === 'vi' ? 'Ngày sinh' : 'Date of birth'}
              </label>
              <div className="relative rounded-xl bg-slate-100 p-1">
                <input 
                  type="date" 
                  required
                  className={inputStyle}
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#8A1538] hover:bg-[#00687A] text-white font-bold text-sm uppercase tracking-widest py-4 rounded-full transition-colors shadow-md mt-auto"
            >
              {lang === 'vi' ? 'TIẾP TỤC' : 'CONTINUE'}
            </button>
          </form>
        </div>
      )}

      {step === 'basics' && (
        <div className="flex flex-col animate-in slide-in-from-right-4 fade-in duration-300">
          <TopNav onBack={() => setStep('dob')} stepIndex={2} />
          
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-[28px] font-sans font-medium text-slate-900 mb-3 tracking-tight">
              {lang === 'vi' ? 'Tiếp theo, một vài thông tin cơ bản' : 'Next, onto the basics'}
            </h2>
            <p className="text-slate-500 text-base">
              {lang === 'vi' ? 'Hãy cho chúng tôi biết về bạn để tạo hồ sơ.' : 'Tell us about yourself, so that we can set up your profile.'}
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setStep('verify'); }} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-1.5 relative group/input">
              <label className="font-bold text-slate-900 text-sm tracking-wide ml-1">
                {lang === 'vi' ? 'Tên' : 'First name'}
              </label>
              <div className="relative rounded-xl bg-slate-100 p-1">
                <input type="text" required className={inputStyle} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 relative group/input">
              <label className="font-bold text-slate-900 text-sm tracking-wide ml-1">
                {lang === 'vi' ? 'Họ' : 'Last name'}
              </label>
              <div className="relative rounded-xl bg-slate-100 p-1">
                <input type="text" required className={inputStyle} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 relative group/input">
              <label className="font-bold text-slate-900 text-sm tracking-wide ml-1">
                {lang === 'vi' ? 'Địa chỉ email' : 'Email address'}
              </label>
              <div className="relative rounded-xl bg-slate-100 p-1">
                <input type="email" required className={inputStyle} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 relative group/input">
              <label className="font-bold text-slate-900 text-sm tracking-wide ml-1">
                {lang === 'vi' ? 'Mật khẩu' : 'Password'}
              </label>
              <div className="relative rounded-xl bg-slate-100 p-1">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
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
              <ul className="mt-3 space-y-1.5 pl-2">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0"></div>
                  {lang === 'vi' ? 'Ít nhất 10 ký tự' : 'Minimum of 10 characters'}
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0"></div>
                  {lang === 'vi' ? 'Có một chữ hoa, chữ thường và số' : 'One uppercase letter, lowercase letter and number'}
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-2">
              <button 
                type="submit"
                className="w-full bg-[#8A1538] hover:bg-[#00687A] text-white font-bold text-sm uppercase tracking-widest py-4 rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                {lang === 'vi' ? 'TIẾP TỤC' : 'CONTINUE'}
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 'verify' && (
        <div className="flex flex-col items-center animate-in slide-in-from-right-4 fade-in duration-300">
          <TopNav onBack={() => setStep('basics')} stepIndex={3} />
          
          <div className="text-center mb-8 w-full">
            <h2 className="text-2xl md:text-[28px] font-sans font-medium text-slate-900 mb-3 tracking-tight">
              {lang === 'vi' ? 'Chúng tôi đã gửi cho bạn một email' : "We've sent you an email"}
            </h2>
            <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
              {lang === 'vi' ? "Vui lòng nhấp vào liên kết trong email vừa được gửi dến 'example@gmail.com' để chúng tôi có thể xác minh email và hoàn tất đăng ký." : "Please click the link in the email we've just sent to 'example@gmail.com' so we can verify your email and complete your registration."}
            </p>
          </div>

          <div className="my-16 text-[#e4002b] flex justify-center">
            <Mail strokeWidth={1} className="w-28 h-28" />
          </div>

          <div className="text-center mt-8 w-full flex flex-col gap-2">
            <span className="font-bold text-slate-900">
              {lang === 'vi' ? 'Chưa nhận được email?' : "Haven't received an email?"}
            </span>
            <button className="text-slate-400 font-medium underline decoration-slate-300 underline-offset-4 hover:text-[#00687A] transition-colors p-1 text-sm inline-block mx-auto">
              {lang === 'vi' ? 'Gửi lại email' : 'Resend email'}
            </button>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="flex flex-col items-center animate-in zoom-in-95 fade-in duration-500">
          <div className="flex-1 flex justify-center w-full mb-10 pt-2">
            <div className="flex items-center gap-1.5 w-full max-w-[200px] md:max-w-[240px]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= 4 ? 'bg-[#b89552]' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
          
          <div className="text-center mb-8 w-full">
            <h2 className="text-2xl md:text-[28px] font-sans font-medium text-slate-900 mb-2 tracking-tight">
              {lang === 'vi' ? 'Bạn đã sẵn sàng!' : "You're all set!"}
            </h2>
            <p className="text-slate-500 text-base">
              {lang === 'vi' ? 'Chào mừng bạn đến với đại gia đình Chạm' : 'Welcome to the Chạm family'}
            </p>
          </div>

          <div className="my-14 text-[#e4002b] flex justify-center">
             <div className="w-28 h-28 rounded-full border-[5px] border-[#e4002b] flex items-center justify-center p-6">
                <Check strokeWidth={4} className="w-full h-full text-[#e4002b]" />
             </div>
          </div>

          <div className="w-full mt-4">
            <button 
              onClick={() => setStep('newsletter')}
              className="w-full bg-[#8A1538] hover:bg-[#00687A] text-white font-bold text-sm uppercase tracking-widest py-4 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              {lang === 'vi' ? 'TIẾP TỤC' : 'CONTINUE'}
            </button>
          </div>
        </div>
      )}

      {step === 'newsletter' && (
        <div className="flex flex-col items-center animate-in slide-in-from-right-4 fade-in duration-300">
          <div className="flex-1 flex justify-center w-full mb-10 pt-2">
            <div className="flex items-center gap-1.5 w-full max-w-[200px] md:max-w-[240px]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full bg-[#b89552]`} />
              ))}
            </div>
          </div>
          
          <div className="text-center mb-12 w-full">
            <h2 className="text-2xl md:text-[28px] font-sans font-medium text-slate-900 mb-3 tracking-tight">
              {lang === 'vi' ? 'Luôn đi trước một bước' : 'Always stay ahead of the game'}
            </h2>
            <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
              {lang === 'vi' ? 'Bật thông báo qua email để tối đa hóa trải nghiệm của bạn trên Chạm.' : 'Enable email updates to maximise your experience on Chạm.'}
            </p>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-900 font-medium text-[15px]">
                {lang === 'vi' ? 'Email' : 'Emails'}
              </span>
              <button 
                type="button" 
                onClick={() => setNewsletter(!newsletter)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${newsletter ? 'bg-[#e4002b]' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${newsletter ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-2 border-b border-slate-100 pb-8">
              {lang === 'vi' ? 'Chúng tôi sẽ giúp bạn cập nhật mọi thông tin cần thiết' : "We'll keep you up to date on everything you need to know"}
            </p>
          </div>

          <div className="w-full mt-10">
            <button 
              onClick={onNavigateLogin}
              className="w-full bg-[#8A1538] hover:bg-[#00687A] text-white font-bold text-sm uppercase tracking-widest py-4 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              {lang === 'vi' ? 'TIẾP TỤC' : 'CONTINUE'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
