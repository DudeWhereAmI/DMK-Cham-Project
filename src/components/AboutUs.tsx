import React from 'react';
import { Sparkles, Heart, Star, Compass } from 'lucide-react';
import { LOGO_HORIZONTAL_URL } from './PngLogo';

interface AboutUsProps {
  lang: 'vi' | 'en';
}

export const AboutUs: React.FC<AboutUsProps> = ({ lang }) => {
  return (
    <div id="about-us-page" className="px-4 md:px-8 max-w-7xl mx-auto py-8 md:py-14 animate-fade-in space-y-12">
      
      {/* SECTION 1: VÌ SAO CHẠM RA ĐỜI */}
      <section className="relative w-full min-h-[600px] md:min-h-[700px] rounded-[32px] overflow-hidden group shadow-xl border border-[#00687A]/10 flex items-center">
        <div className="absolute inset-0">
           <img 
             src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/Landing%20Page.png" 
             className="w-full h-full object-cover opacity-60 transition-transform duration-[2s] ease-out group-hover:scale-105" 
             alt="Chạm Studio Workspace Background" 
             referrerPolicy="no-referrer"
           />
        </div>
        {/* Gradient overlays to make text readable */}
        <div className="absolute inset-0 bg-[#FBF5F2]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBF5F2]/95 via-[#FBF5F2]/80 to-transparent z-10" />
        
        <div className="relative z-20 w-full max-w-3xl px-6 md:px-16 py-12 space-y-8">
           <h2 className="font-serif text-3xl md:text-5xl text-[#00687A] font-bold uppercase tracking-tight">
              {lang === 'vi' ? 'VÌ SAO ‘CHẠM’ RA ĐỜI?' : 'WHY WAS ‘CHẠM’ BORN?'}
           </h2>
           
           <div className="space-y-4 text-[#00687A]/90 text-sm md:text-base font-serif leading-relaxed text-justify md:text-left">
              {lang === 'vi' ? (
                <>
                  <p className="font-bold text-lg text-[#00687A]">Có những ngày, chúng ta sống quá nhanh.</p>
                  <p>Nhanh đến mức chọn đại một món đồ, buộc vội mái tóc, soi gương trong vài giây rồi bước ra ngoài mà không thực sự để ý mình đang mang theo điều gì. Mọi thứ dần trở nên giống nhau. Những lựa chọn an toàn. Những thói quen lặp lại.</p>
                  <p>Và đôi khi, chính mình cũng trở nên “mờ đi” trong chính cuộc sống của mình.</p>
                  <p className="font-bold text-lg text-[#00687A] pt-2">CHẠM ra đời để bạn tìm lại nhịp điệu ấy.</p>
                  <p>Mỗi chiếc kẹp, mỗi chiếc gương tại CHẠM là một mảnh ghép mang năng lượng Ngũ Hành, là điểm tựa may mắn đồng hành cùng bạn một cách thầm lặng. Năm sắc màu đại diện cho năm bản mệnh - để khi chiếc gương và chiếc kẹp sánh đôi, vòng tròn tương sinh sẽ được kích hoạt, giúp nhân đôi năng lượng, nâng đỡ và nuôi dưỡng tâm trí bạn.</p>
                  <p>Nhưng dòng chảy năng lượng ấy chỉ thực sự chuyển động khi nó hòa cùng tần số của riêng bạn…</p>
                  <p>Chính vì thế, CHẠM nguyện là người bạn đồng hành cùng bạn trên hành trình khơi mở bản sắc cá nhân. Nơi bạn tự do dung hòa sắc màu, tự tay định hình sự kết hợp và gửi gắm vào đó những dấu ấn rất riêng. Để một vật dụng dẫu quen thuộc, qua cái chạm tinh tế của bạn, liền hóa thành một phiên bản có ‘1-0-2’ và không thể thay thế.</p>
                  <div className="pt-4">
                    <p className="italic text-slate-700 bg-white/40 backdrop-blur-sm p-5 py-4 border-l-4 border-[#E28C9A] rounded-r-xl shadow-sm">
                      Bởi vì sau cùng, giá trị thực sự của một món đồ không nằm ở hình hài bên ngoài, mà ở cách nó nâng niu, phản chiếu và cộng hưởng với tần số bên trong bạn. Một cái chạm tay, một khoảnh khắc nhìn ngắm là một lần năng lượng được cân bằng.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-bold text-lg text-[#00687A]">There are days when we live too fast.</p>
                  <p>Too fast to pick a random item, tie our hair in a rush, look into the mirror for just a few seconds and step out without truly noticing what we are carrying. Everything starts looking identical. Safe choices. Repetitive habits.</p>
                  <p>And sometimes, we even fade away in our own lives.</p>
                  <p className="font-bold text-lg text-[#00687A] pt-2">CHẠM was born for you to find that rhythm again.</p>
                  <p>Each claw clip, each mirror at CHẠM is a puzzle piece carrying the energy of the Five Elements, standing as a quiet source of luck by your side. Five colors represent the five lifelines - so when the mirror and clip are paired, the circle of mutual growth is activated, doubling the energy, supporting and nourishing your mind.</p>
                  <p>But that flow of energy only truly moves when it harmonizes with your own frequency...</p>
                  <p>Therefore, CHẠM promises to accompany you on your journey of personal discovery. A space where you freely blend colors, customize combinations, and leave your own unique imprint. Even a familiar everyday item, through your delicate touch, becomes a one-of-a-kind, irreplaceable masterpiece.</p>
                  <div className="pt-4">
                    <p className="italic text-slate-700 bg-white/40 backdrop-blur-sm p-5 py-4 border-l-4 border-[#E28C9A] rounded-r-xl shadow-sm">
                      Because in the end, the true value of an object lies not in its physical appearance, but in how it cradles, reflects, and resonates with your internal frequency. A slight touch, a moment of reflection, is a step closer to balance.
                    </p>
                  </div>
                </>
              )}
           </div>
        </div>
      </section>

      {/* SECTION 2: Ý NGHĨA TÊN THƯƠNG HIỆU CHẠM */}
      <section className="relative w-full min-h-[500px] md:min-h-[600px] rounded-[32px] overflow-hidden group shadow-xl border border-[#00687A]/10 flex flex-col md:flex-row items-center justify-between">
        <div className="absolute inset-0">
           <img 
             src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/Landing%20Page.png" 
             className="w-full h-full object-cover opacity-60 transition-transform duration-[2s] ease-out group-hover:scale-105" 
             alt="Chạm Brand Meaning Background" 
             referrerPolicy="no-referrer"
           />
        </div>
        {/* Gradient overlays to make text readable, this time fading from Right to Left */}
        <div className="absolute inset-0 bg-[#FBF5F2]/40" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#FBF5F2]/95 via-[#FBF5F2]/80 to-[#FBF5F2]/40 z-10" />
        
        {/* Brand Logo Display on Left */}
        <div className="relative z-20 w-full md:w-1/2 flex justify-center items-center p-8 md:pl-16">
          <img 
            src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/LOGO%20.png" 
            className="w-full max-w-[250px] md:max-w-[500px] h-auto object-contain drop-shadow-2xl opacity-90 transition-transform duration-700 hover:scale-105" 
            alt="Chạm Large Logo" 
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 w-full md:w-1/2 max-w-2xl px-6 md:px-16 py-12 space-y-8 flex flex-col items-start md:items-end text-left md:text-right">
           <div className="bg-white/50 backdrop-blur-md p-3 px-5 rounded-2xl shadow-sm mb-4">
             <img src={LOGO_HORIZONTAL_URL} className="h-8 md:h-10 w-auto object-contain" alt="Chạm Logo" />
           </div>
           
           <h2 className="font-serif text-3xl md:text-5xl text-[#00687A] font-bold uppercase tracking-tight">
              {lang === 'vi' ? 'Ý NGHĨA THƯƠNG HIỆU' : 'THE MEANING OF CHẠM'}
           </h2>
           
           <div className="space-y-5 text-[#00687A]/90 text-[15px] md:text-[17px] font-serif leading-[1.8] text-justify md:text-justify w-full">
              {lang === 'vi' ? (
                <>
                  <p>CHẠM không chỉ là một cái tên, mà là khoảnh khắc bạn bắt đầu kết nối với chính mình mỗi ngày.</p>
                  <p>Đó là cái chạm tay đầy nâng niu để kẹp lại mái tóc, là ánh mắt chạm vào mặt gương để ngắm nhìn bản thân trước khi bước ra thế giới. Đó còn là cái chạm của sự sáng tạo - nơi bạn tự do trang trí để biến những vật dụng thường nhật thành tuyên ngôn cá tính độc nhất.</p>
                  <p>Và sâu sắc hơn cả, CHẠM là sự giao thoa khi sắc màu bản mệnh bên ngoài chạm đúng tần số năng lượng bên trong bạn, tạo nên một điểm tựa tinh thần vững chắc.</p>
                  
                  <div className="pt-6 w-full flex justify-start md:justify-end">
                    <p className="italic text-lg md:text-xl text-[#00687A] font-bold border-l-4 md:border-l-0 md:border-r-4 border-[#E28C9A] pl-4 md:pl-0 md:pr-4 py-2 opacity-90 md:text-right text-left">
                      Một giây dừng lại để CHẠM<br/>
                      Để chỉn chu diện mạo, nạp lại an yên<br/>
                      Và tự tin là chính mình, trọn vẹn nhất.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p>CHẠM is not just a name, but the moment you begin to connect with yourself every day.</p>
                  <p>It is a gentle touch to style your hair, an eye contact into the mirror to appreciate yourself before meeting the world. It is also the touch of creativity - where you freely decorate to convert daily items into unique personal statements.</p>
                  <p>And most deeply of all, CHẠM is the intersection where external birth colors touch your internal energy, creating a silent source of spiritual support.</p>
                  
                  <div className="pt-6 w-full flex justify-start md:justify-end">
                    <p className="italic text-lg md:text-xl text-[#00687A] font-bold border-l-4 md:border-l-0 md:border-r-4 border-[#E28C9A] pl-4 md:pl-0 md:pr-4 py-2 opacity-90">
                      A second to pause and CHẠM<br/>
                      To perfect your look, recharge tranquility<br/>
                      And confidently be your full self.
                    </p>
                  </div>
                </>
              )}
           </div>
        </div>
      </section>

    </div>
  );
};
