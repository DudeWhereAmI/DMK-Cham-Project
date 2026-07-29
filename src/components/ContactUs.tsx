import React, { useState } from 'react';
import { Mail, Instagram, Send, Sparkles, CheckCircle2 } from 'lucide-react';

const API_BASE = '';


interface ContactUsProps {
  lang: 'vi' | 'en';
}

export const ContactUs: React.FC<ContactUsProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await fetch(`${API_BASE}/api/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setIsSubmitted(true);
      // Auto-reset submission alert after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ fullName: '', email: '', subject: '', message: '' });
      }, 4000);
    } catch (error) {
      console.error("Failed to send message", error);
      alert(lang === 'vi' ? 'Lỗi gửi tin nhắn, vui lòng thử lại sau.' : 'Error sending message, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 md:py-10 animate-fade-in font-sans">
      
      {/* Title / Description */}
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#E28C9A] bg-[#E28C9A]/10 px-3 py-1 rounded-full inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          {lang === 'vi' ? 'Kết Nối Cùng Chạm' : 'Connect with Chạm'}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-[#00687A] font-black tracking-tight">
          {lang === 'vi' ? 'Liên Hệ Với Chúng Mình' : 'Contact Us'}
        </h1>
        <p className="font-serif italic text-slate-500 text-sm md:text-base">
          {lang === 'vi' 
            ? 'Đội ngũ chăm sóc luôn sẵn sàng lắng nghe mọi ý kiến và hỗ trợ thiết kế sản phẩm riêng cho bạn' 
            : 'Our curation team is always ready to listen, advise, and support your custom destiny designs'}
        </p>
        <div className="h-[1px] w-12 bg-[#E28C9A] mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: 3 info cards (Email, Facebook, TikTok) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: Email contact */}
          <div className="bg-white border border-[#E28C9A]/15 rounded-3xl p-6 md:p-8 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#FBF5F2] rounded-full -translate-y-10 translate-x-10 -z-0 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-base md:text-lg font-black text-[#00687A] tracking-tight">
                  {lang === 'vi' ? 'Liên hệ qua email' : 'Contact via email'}
                </h3>
                <p className="text-xs text-slate-450 md:text-sm text-slate-500 leading-relaxed font-serif">
                  {lang === 'vi' 
                    ? 'Dành cho thắc mắc chế tác thiết kế và hỗ trợ khách hàng.' 
                    : 'Dedicated for bespoke craftsmanship adjustments and customer support.'}
                </p>
              </div>
              <div className="pt-2">
                <a 
                  href="mailto:cham.elements@gmail.com" 
                  className="text-indigo-600 hover:text-[#E28C9A] transition font-bold text-xs md:text-sm tracking-wide break-all"
                >
                  cham.elements@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Facebook */}
          <div className="bg-white rounded-3xl hover:shadow-md transition-all duration-300 overflow-hidden flex flex-row group shadow-xs border border-[#E28C9A]/15 p-5 md:p-6">
            {/* Content */}
            <div className="w-full flex items-center bg-white">
              <a 
                href="https://www.facebook.com/profile.php?id=61591049410705" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full group/link"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl bg-[#00687A]/10 flex items-center justify-center text-[#00687A] group-hover/link:scale-110 transition-transform shadow-xs border border-[#00687A]/20">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-sm md:text-base font-black text-[#00687A] tracking-tight">Facebook</span>
                  <span className="text-[#00687A] hover:text-[#E28C9A] transition font-bold text-xs md:text-sm tracking-wide line-clamp-1 break-all">@cham.elements</span>
                </div>
              </a>
            </div>
          </div>

          {/* Card 3: TikTok */}
          <div className="bg-white rounded-3xl hover:shadow-md transition-all duration-300 overflow-hidden flex flex-row group shadow-xs border border-[#E28C9A]/15 p-5 md:p-6">
            {/* Content */}
            <div className="w-full flex items-center bg-white">
              <a 
                href="https://www.tiktok.com/@cham.elements?_r=1&_t=ZS-97WdJdLmO6H" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full group/link"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl bg-[#E28C9A]/10 flex items-center justify-center text-[#E28C9A] group-hover/link:scale-110 transition-transform shadow-xs border border-[#E28C9A]/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.46-.23-2.61.88-5.26 2.87-6.87 1.4-.95 3.12-1.36 4.79-1.12.02 1.25-.01 2.49.02 3.73-.78-.1-1.57-.1-2.32.18-.75.29-1.35.88-1.63 1.63-.3.8-.26 1.72.16 2.49.46.85 1.34 1.45 2.3 1.51 1.4.11 2.8-.57 3.51-1.74.37-.62.59-1.35.59-2.09V.02h4.52z"/></svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-sm md:text-base font-black text-[#00687A] tracking-tight">TikTok</span>
                  <span className="text-[#E28C9A] hover:text-[#00687A] transition font-bold text-xs md:text-sm tracking-wide line-clamp-1 break-all">@cham.elements</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      
        {/* Right column: Large Message Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative">
          
          {isSubmitted && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-3xl z-30 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
              <h3 className="font-serif text-xl md:text-2xl font-black text-[#00687A]">
                {lang === 'vi' ? 'Gửi tin nhắn thành công!' : 'Message Sent Successfully!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm font-serif">
                {lang === 'vi' 
                  ? 'Cảm ơn bạn đã liên hệ cùng Chạm. Bộ phận phụ trách sẽ phản hồi lại qua hòm thư điện tử của bạn trong vòng tối thiểu 24h.' 
                  : 'Thank you for reaching out to Chạm. Our team will respond to your email address within 24 business hours.'}
              </p>
            </div>
          )}

          <div className="space-y-8">
            <h2 className="font-serif text-xl md:text-2.5xl font-black text-[#00687A] tracking-tight">
              {lang === 'vi' ? 'Gửi tin nhắn cho chúng mình nhé!' : 'Send us a message!'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Họ và tên */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[11px] sm:text-xs font-bold text-[#00687A] tracking-wider uppercase font-coheading">
                    {lang === 'vi' ? 'Họ và tên' : 'Full Name'} <span className="text-[#E28C9A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#E28C9A] focus:border-[#E28C9A] transition-all"
                  />
                </div>

                {/* Địa chỉ email */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[11px] sm:text-xs font-bold text-[#00687A] tracking-wider uppercase font-coheading">
                    {lang === 'vi' ? 'Địa chỉ email' : 'Email Address'} <span className="text-[#E28C9A]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="emailcuaban@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#E28C9A] focus:border-[#E28C9A] transition-all"
                  />
                </div>
              </div>

              {/* Chủ đề */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] sm:text-xs font-bold text-[#00687A] tracking-wider uppercase font-coheading">
                  {lang === 'vi' ? 'Chủ đề' : 'Subject'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'vi' ? 'Tiêu đề tin nhắn' : 'Message subject'}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#E28C9A] focus:border-[#E28C9A] transition-all"
                />
              </div>

              {/* Nội dung tin nhắn */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] sm:text-xs font-bold text-[#00687A] tracking-wider uppercase font-coheading">
                  {lang === 'vi' ? 'Nội dung tin nhắn' : 'Message Content'} <span className="text-[#E28C9A]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={lang === 'vi' ? 'Nội dung bạn muốn gửi cho chúng mình...' : 'Enter your message content here...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#E28C9A] focus:border-[#E28C9A] transition-all resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 bg-[#00687A] text-white hover:bg-[#E28C9A] transition-all duration-300 rounded-2xl flex items-center justify-center gap-2 text-xs md:text-sm font-black uppercase tracking-wider shadow-sm hover:scale-[1.01] cursor-pointer font-coheading disabled:opacity-75 disabled:cursor-wait"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting 
                    ? (lang === 'vi' ? 'Đang gửi...' : 'Sending...') 
                    : (lang === 'vi' ? 'Gửi tin nhắn' : 'Send Message')}
                </span>
              </button>

            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
