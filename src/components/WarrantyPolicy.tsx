import React, { useState } from 'react';
import { ShieldCheck, Calendar, RefreshCw, AlertTriangle, FileText, Activity, Search, Sparkles } from 'lucide-react';

interface WarrantyPolicyProps {
  lang: 'vi' | 'en';
}

export const WarrantyPolicy: React.FC<WarrantyPolicyProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'period' | 'conditions' | 'procedure'>('all');

  const policyIntroVi = {
    title: 'CHÍNH SÁCH BẢO HÀNH & ĐỔI TRẢ',
    subtitle: 'Áp dụng cho Bộ phụ kiện chế tác thủ công Bản Mệnh',
    lawRef: 'Cập nhật và tuân thủ Luật Bảo vệ quyền lợi người tiêu dùng số 19/2023/QH15 (Có hiệu lực thi hành từ ngày 01/7/2024)',
    intro: 'CHẠM xin thông tin đến quý khách hàng chính sách bảo hành và đổi trả tại hệ thống của chúng tôi. CHẠM cam kết bảo hành trung thực, minh bạch đúng như những gì đã công bố trên các kênh chính thức (Website, Fanpage) nhằm bảo vệ trải nghiệm an tâm nhất của bạn khi sở hữu bộ phụ kiện Bản Mệnh.',
  };

  const policyIntroEn = {
    title: 'WARRANTY & RETURNS POLICY',
    subtitle: 'Applicable for Bespoke Handcrafted Destiny Accessories',
    lawRef: 'Updated in compliance with the Consumer Rights Protection Law No. 19/2023/QH15 (Effective from July 1, 2024)',
    intro: 'CHẠM would like to inform our valued customers of our official warranty and return policy. We commit to honest and transparent warranty services as published across our channels, protecting your peace of mind when owning our handcrafted accessories.',
  };

  const intro = lang === 'vi' ? policyIntroVi : policyIntroEn;

  const articles = [
    {
      id: 'art1',
      tag: 'period',
      icon: <Calendar className="w-6 h-6 text-[#E28C9A]" />,
      titleVi: 'Điều 1. Thời hạn và Phạm vi Bảo hành Miễn phí (Mốc 45 - 60 ngày)',
      titleEn: 'Article 1. Free Warranty Period and Scope (45 - 60 Days)',
      contentVi: [
        'Thời hạn áp dụng: CHẠM bảo hành kỹ thuật hoàn toàn miễn phí trong vòng từ 45 đến 60 ngày (hệ thống tự động tính từ ngày đơn vị vận chuyển cập nhật trạng thái "Giao hàng thành công").',
        'Phạm vi xử lý: Hỗ trợ đính và dán lại toàn bộ các hạt charm đá, linh vật phong thủy bị bong tróc, lỏng mối keo trong quá trình sử dụng hằng ngày.',
        'Quy định cộng nối thời gian: Thời gian sản phẩm nằm tại xưởng để sữa chữa (từ 02 đến 05 ngày) sẽ không tính vào hạn bảo hành. Hệ thống sẽ tự động cộng nối thêm số ngày tương ứng cho khách hàng khi gửi trả sản phẩm.',
        'ℹ️ Lưu ý: Mọi lỗi bóc hộp phát hiện ngay trong 3 ngày đầu tiên sẽ không thuộc diện bảo hành này mà được xử lý đổi mới 100% theo [Chính sách Đổi trả & Hoàn tiền].'
      ],
      contentEn: [
        'Applicable duration: CHẠM provides completely free technical warranty for 45 to 60 days (automatically calculated from the date the courier confirms "Delivered successfully").',
        'Scope of service: Support re-attaching all stone charms and feng shui guardian elements that peeled off or loosened under daily use.',
        'Time-connection regulation: Time spent at our studio for repairs (2 to 5 days) does not count towards your warranty period. Our system automatically adds these days back to your warranty.',
        'ℹ️ Note: Any unboxing defects detected within the first 3 days will be replaced 100% under our Refund & Exchange policy rather than this repair warranty.'
      ],
    },
    {
      id: 'art2',
      tag: 'period',
      icon: <RefreshCw className="w-6 h-6 text-[#E28C9A]" />,
      titleVi: 'Điều 2. Thời hạn bảo hành và Cách tính ngày hết hạn',
      titleEn: 'Article 2. Warranty Determination & Calculations',
      contentVi: [
        'Thời hạn bảo hành được hệ thống tính tự động dựa trên ngày đơn vị vận chuyển cập nhật trạng thái "Giao hàng thành công" (đối với đơn online) hoặc ngày in trên hóa đơn điện tử (đối với đơn trực tiếp):',
        '👉 Đổi sản phẩm mới (1-đổi-1 trong 3 ngày đầu): Áp dụng nếu sản phẩm có lỗi hư hỏng do Nhà sản xuất hoặc lỗi nứt vỡ, mẻ gương do đơn vị Vận chuyển (Yêu cầu khách hàng cung cấp video clip mở hộp/unbox).',
        '👉 Sửa chữa miễn phí (Bảo hành kỹ thuật 45 - 60 ngày): Hỗ trợ đính và dán lại toàn bộ các hạt charm, linh vật bị bong tróc mối keo trong quá trình sử dụng hằng ngày.',
        '👉 Hậu mãi trọn đời sản phẩm (Khi đã hết mốc 45 - 60 ngày): Sản phẩm chính thức hết hạn bảo hành miễn phí. CHẠM chuyển sang chế độ hỗ trợ sửa chữa, gia cố khôi phục phôi kẹp/gương và chỉ tính phí linh kiện thay thế với giá gốc ưu đãi.'
      ],
      contentEn: [
        'Warranty periods are auto-calculated from online courier portal data or physical receipts:',
        '👉 1-to-1 Replacement (First 3 Days): Applicable for manufacturer defects or transit damage (cracked, chipped glass). Unboxing video required.',
        '👉 Free Technical Repairs (45-60 Days): Free adhesive and setting reinforcement for daily wear charm detachment.',
        '👉 Lifetime Support (Post 45-60 Days): Once the free service expires, CHẠM transitions to lifetime maintenance, restoring clips or mirrors at basic raw material costs.'
      ]
    },
    {
      id: 'art3',
      tag: 'conditions',
      icon: <AlertTriangle className="w-6 h-6 text-[#E28C9A]" />,
      titleVi: 'Điều 3. Các trường hợp từ chối bảo hành',
      titleEn: 'Article 3. Warranty Exclusions & Removals',
      contentVi: [
        'CHẠM được miễn trừ trách nhiệm bảo hành nếu sản phẩm rơi vào các trường hợp sau:',
        '❌ Sản phẩm đã quá mốc thời gian quy định tại Điều 2.',
        '❌ Khách hàng thay đổi ý định cá nhân đối với các dòng sản phẩm đã tiến hành chế tác thủ công theo yêu cầu riêng hoặc sản phẩm có khắc tên riêng.',
        '❌ Sản phẩm bị hư hỏng do lỗi sử dụng không đúng cách hoặc do tác động ngoại lực từ phía người dùng (làm rơi vỡ gương, gãy phôi kẹp do đè nén, va đập mạnh, tự làm mất hạt charm đính kèm).',
        '❌ Sản phẩm bị tác động bởi môi trường hoặc hóa chất khiến chất liệu bị nóng chảy, biến dạng, xỉn màu (để trong cốp xe quá nóng, tiếp xúc nước hoa, hóa chất nhuộm tóc, ...).',
        '❌ Sản phẩm có dấu hiệu tự ý cạy mở, sửa chữa bằng các loại keo không chuyên dụng bên ngoài trước khi gửi về CHẠM.'
      ],
      contentEn: [
        'CHẠM is exempt from warranty liabilities under these conditions:',
        '❌ The product has exceeded the designated period specified in Article 2.',
        '❌ Personal changes of mind on custom-handcrafted products or engraved items.',
        '❌ Accidental damage, heavy impact, structural breakage caused by customer (dropping mirror, crushing hair pin frame, or losing detached charm parts).',
        '❌ Exposure to extreme environmental factors or chemicals causing warping, melting, or discoloration (car trunk heat, perfume contact, hair dyes).',
        '❌ Product has signs of self-repair with non-specialized household adhesives prior to sending back.'
      ]
    },
    {
      id: 'art4',
      tag: 'conditions',
      icon: <ShieldCheck className="w-6 h-6 text-[#E28C9A]" />,
      titleVi: 'Điều 4. Yêu cầu hợp lệ tiếp nhận bảo hành',
      titleEn: 'Article 4. Valid Warranty Eligibility Criteria',
      contentVi: [
        'Sản phẩm đáp ứng đầy đủ điều kiện quy định tại Điều 2 và không thuộc diện bị từ chối tại Điều 3.',
        'Thủ tục đối chiếu đơn giản: Khách hàng chỉ cần cung cấp mã đơn hàng trực tuyến hoặc ảnh chụp màn hình lịch sử mua hàng trên hệ thống kênh bán online của CHẠM để nhân viên đối chiếu kiểm tra.',
        'CHẠM sẽ chủ động cấp Biên nhận bảo hành (điện tử qua SMS/Zalo hoặc Giấy hẹn) ghi rõ chi tiết lỗi nhận và đúng ngày hẹn trả hàng.'
      ],
      contentEn: [
        'The product meets all standards in Article 2 and contains no exclusions listed in Article 3.',
        'Check-in Procedure: Provide your online Order ID or screenshot of purchase history on any official CHẠM store channel for verification.',
        'CHẠM will issue a Digital Warranty Receipt specifying technical status and strict dispatch dates.'
      ]
    },
    {
      id: 'art5',
      tag: 'procedure',
      icon: <FileText className="w-6 h-6 text-[#E28C9A]" />,
      titleVi: 'Điều 5. Quy trình và Thủ tục tiếp nhận bảo hành qua Form điện tử',
      titleEn: 'Article 5. E-Warranty Request Form and Collection Process',
      contentVi: [
        'Để quy trình xử lý từ xa được nhanh chóng và chính xác nhất, khách hàng vui lòng thực hiện theo các bước sau:',
        '📝 Bước 1 (Đăng ký thông tin): Khách hàng truy cập vào [Form Bảo hành/Đổi trả trực tuyến của CHẠM] (được ghim tại Bio Fanpage/TikTok Shop). Điền đầy đủ thông tin: Mã đơn hàng, Số điện thoại mua hàng, Video clip unbox/Hình ảnh chụp rõ tình trạng lỗi và lựa chọn phương thức (Gửi chuyển phát hoặc Đến trực tiếp).',
        '💬 Bước 2 (Xác nhận hệ thống): Trong vòng 24h làm việc, bộ phận CSKH của CHẠM sẽ kiểm tra mốc thời gian trên hệ thống để xác nhận sản phẩm còn hạn bảo hành hay không. Hệ thống gửi một Mã xác nhận bảo hành (Biên nhận điện tử) qua Zalo/Tin nhắn cho khách kèm ngày hẹn trả hàng dự kiến.',
        '🚚 Bước 3 (Thu hồi sản phẩm):',
        '• Đối với khách chọn gửi chuyển phát: CHẠM sẽ chủ động điều phối shipper của đối tác vận chuyển đến tận nhà khách để thu hồi sản phẩm (Khách không cần tự mang ra bưu cục).',
        '• Đối với khách chọn đến trực tiếp: Khách mang sản phẩm kèm Mã xác nhận bảo hành đến số 279 Nguyễn Tri Phương để bàn giao cho bộ phận kỹ thuật.'
      ],
      contentEn: [
        'To streamline remote returns and technical handling, please complete the following framework:',
        '📝 Step 1 (Online Registration): Visit CHẠM\'s Online Warranty Form (pinned in Bio of Facebook Page/TikTok Shop). Fill in Order ID, phone number, attach unboxing video or status images, and choose preferred handling (Courier or Walk-in).',
        '💬 Step 2 (System Approval): Within 24 business hours, our Customer Success team cross-checks records. A Digital Ticket with expected completion details is sent via Zalo/SMS.',
        '🚚 Step 3 (Product Collection):',
        '• Shipping option: CHẠM schedules a dedicated courier partner to pick up the item at your doorstep (no postal office visit required).',
        '• Walk-in option: Bring your item and Digital Ticket code to our studio at 279 Nguyen Tri Phuong for instant technical handover.'
      ]
    },
    {
      id: 'art6',
      tag: 'procedure',
      icon: <Activity className="w-6 h-6 text-[#E28C9A]" />,
      titleVi: 'Điều 6. Khiếu nại và Giải quyết tranh chấp',
      titleEn: 'Article 6. Dispute Resolution & Customer Care Support',
      contentVi: [
        'Trong trường hợp có bất kỳ thắc mắc hoặc khiếu nại nào về tiến độ và chất lượng bảo hành, quý khách vui lòng liên hệ trực tiếp thông qua số Hotline của CHẠM để được hỗ trợ giải quyết nhanh nhất trên tinh thần tôn trọng toàn diện quyền lợi của người tiêu dùng.'
      ],
      contentEn: [
        'Should you have feedback or complaints regarding repair speed or craftsmanship, please contact the CHẠM Hotline directly. We handle all inquiries promptly, honoring consumer protection guidelines and maintaining mutual trust.'
      ]
    }
  ];

  const filteredArticles = articles.filter(art => {
    const title = lang === 'vi' ? art.titleVi : art.titleEn;
    const contentText = (lang === 'vi' ? art.contentVi : art.contentEn).join(' ');
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          contentText.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || art.tag === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4 animate-fade-in font-sans">
      
      {/* Editorial Header Block */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#E28C9A] bg-[#E28C9A]/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 animate-pulse">
          <ShieldCheck className="w-3.5 h-3.5" />
          {lang === 'vi' ? 'DỊCH VỤ AN TÂM 100%' : '100% PEACE OF MIND SERVICES'}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-[#00687A] font-black tracking-tight leading-tight">
          {intro.title}
        </h1>
        <p className="font-serif italic text-slate-500 text-sm md:text-base leading-relaxed">
          {intro.subtitle}
        </p>
        <div className="h-[1px] w-12 bg-[#E28C9A] mx-auto mt-2"></div>
        <p className="text-[10px] md:text-xs text-slate-400 font-semibold uppercase tracking-wider bg-slate-100 p-2 rounded-xl border border-slate-200/50">
          {intro.lawRef}
        </p>
      </div>

      {/* Intro Editorial Callout */}
      <div className="bg-white border border-[#E28C9A]/15 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#FBF5F2] rounded-full -translate-y-16 translate-x-16 -z-0 opacity-40"></div>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed text-justify relative z-10 font-serif">
          {intro.intro}
        </p>
      </div>

      {/* Filter and Search Layout Grid */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-slate-200 pb-4">
        {/* Toggle Categories Tabs */}
        <div className="flex bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto overflow-x-auto text-xs font-bold shrink-0 font-coheading">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-2 rounded-lg transition-all ${
              activeTab === 'all' ? 'bg-[#00687A] text-white shadow-xs' : 'text-[#00687A]/75 hover:text-[#00687A]'
            }`}
          >
            {lang === 'vi' ? 'Tất cả' : 'All Articles'}
          </button>
          <button
            onClick={() => setActiveTab('period')}
            className={`px-3 py-2 rounded-lg transition-all ${
              activeTab === 'period' ? 'bg-[#00687A] text-white shadow-xs' : 'text-[#00687A]/75 hover:text-[#00687A]'
            }`}
          >
            {lang === 'vi' ? 'Thời hạn & Mốc' : 'Warranty Period'}
          </button>
          <button
            onClick={() => setActiveTab('conditions')}
            className={`px-3 py-2 rounded-lg transition-all ${
              activeTab === 'conditions' ? 'bg-[#00687A] text-white shadow-xs' : 'text-[#00687A]/75 hover:text-[#00687A]'
            }`}
          >
            {lang === 'vi' ? 'Từ chối & Điều kiện' : 'Exclusions'}
          </button>
          <button
            onClick={() => setActiveTab('procedure')}
            className={`px-3 py-2 rounded-lg transition-all ${
              activeTab === 'procedure' ? 'bg-[#00687A] text-white shadow-xs' : 'text-[#00687A]/75 hover:text-[#00687A]'
            }`}
          >
            {lang === 'vi' ? 'Quy trình / Form' : 'Procedure & Form'}
          </button>
        </div>

        {/* Real-time search inside articles */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder={lang === 'vi' ? 'Tìm nhanh nội dung...' : 'Search policy terms...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#E28C9A] focus:border-[#E28C9A]"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Styled Articles Grid List */}
      <div className="space-y-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((art) => (
            <div 
              key={art.id}
              className="bg-white border border-slate-200/60 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#FBF5F2] rounded-xl shrink-0">
                  {art.icon}
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="font-serif text-base md:text-lg font-bold text-[#00687A]">
                    {lang === 'vi' ? art.titleVi : art.titleEn}
                  </h3>
                  <div className="space-y-2 mt-2">
                    {(lang === 'vi' ? art.contentVi : art.contentEn).map((paragraph, index) => (
                      <p 
                        key={index}
                        className={`text-xs md:text-sm text-slate-600 leading-relaxed ${
                          paragraph.startsWith('•') ? 'pl-3' : ''
                        } ${
                          paragraph.includes('✅') || paragraph.includes('❌') || paragraph.includes('ℹ️') || paragraph.includes('👉')
                            ? 'font-medium text-slate-700'
                            : ''
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 space-y-2">
            <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold">
              {lang === 'vi' ? 'Không tìm thấy điều khoản nào khớp với từ khóa.' : 'No matching policy terms found.'}
            </p>
          </div>
        )}
      </div>

      {/* Interactive Form Callout Card */}
      <div className="p-6 bg-[#00687A] text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden font-coheading">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#E28C9A]/10 rounded-full blur-xl"></div>
        <div className="space-y-2 flex-1">
          <h4 className="text-sm md:text-base font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E28C9A]" />
            <span>{lang === 'vi' ? 'Nộp Form Yêu Cầu Bảo Hành / Đổi Trả Trực Tuyến' : 'Launch Online Return / Warranty Form'}</span>
          </h4>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            {lang === 'vi' 
              ? 'Hệ thống tự động tra cứu mã hoán đơn và kích hoạt đội vận tải đến tận nhà lấy sản phẩm để chuyển giao kỹ sư phục chế.' 
              : 'Our system instantly checks your order status and coordinates our courier straight to your door for restorative handling.'}
          </p>
        </div>
        <a 
          href="https://google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-[#E28C9A] hover:bg-[#E28C9A]/90 text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 text-center shadow-xs"
        >
          {lang === 'vi' ? 'Mở Form Đăng Ký' : 'Open Claim Form'}
        </a>
      </div>

    </div>
  );
};
