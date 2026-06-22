import React, { useState } from 'react';
import { Mail, Instagram, Send, Sparkles, CheckCircle2 } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      return;
    }
    setIsSubmitted(true);
    // Auto-reset submission alert after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    }, 4000);
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
        
        {/* Left column: 2 info cards (Email and Instagram) */}
        <div className="lg:col-span-5 space-y-6">
          
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
                  href="mailto:cham.accessoriesvietnam@gmail.com" 
                  className="text-indigo-600 hover:text-[#E28C9A] transition font-bold text-xs md:text-sm tracking-wide break-all"
                >
                  cham.accessoriesvietnam@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Instagram */}
          <div className="bg-white border border-[#E28C9A]/15 rounded-3xl p-6 md:p-8 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#FBF5F2] rounded-full -translate-y-10 translate-x-10 -z-0 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shadow-sm">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-base md:text-lg font-black text-[#00687A] tracking-tight">
                  {lang === 'vi' ? 'Mạng xã hội' : 'Social networks'}
                </h3>
                <p className="text-xs text-slate-450 md:text-sm text-slate-500 leading-relaxed font-serif">
                  {lang === 'vi' 
                    ? 'Follow tụi mình để không bỏ lỡ các mẫu thiết kế mới độc quyền nhé!' 
                    : 'Follow us so you don\'t miss any newly dropped exclusive designs!'}
                </p>
              </div>
              <div className="pt-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-[#E28C9A] transition font-bold text-xs md:text-sm tracking-wide"
                >
                  @cham.accessoriesvietnam
                </a>
              </div>
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
                className="w-full py-4.5 bg-[#00687A] text-white hover:bg-[#E28C9A] transition-all duration-300 rounded-2xl flex items-center justify-center gap-2 text-xs md:text-sm font-black uppercase tracking-wider shadow-sm hover:scale-[1.01] cursor-pointer font-coheading"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'vi' ? 'Gửi tin nhắn' : 'Send Message'}</span>
              </button>

            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
