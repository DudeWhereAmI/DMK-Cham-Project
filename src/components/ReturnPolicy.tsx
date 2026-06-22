import React from 'react';

interface ReturnPolicyProps {
  lang: 'vi' | 'en';
}

export const ReturnPolicy: React.FC<ReturnPolicyProps> = ({ lang }) => {
  const content = {
    title: lang === 'vi' ? 'Chính Sách Đổi Trả' : 'Return Policy',
    intro: lang === 'vi' 
      ? 'CHẠM luôn nỗ lực mang đến những bộ phụ kiện Bản Mệnh hoàn hảo nhất. Tuy nhiên, do đặc thù hàng chế tác thủ công (handmade) và vận chuyển từ xa, nếu sản phẩm gặp sự cố ngay khi vừa nhận hàng, CHẠM áp dụng chính sách hỗ trợ đổi mới sản phẩm 1-đổi-1 thông qua hệ thống tiếp nhận Google Form dưới đây:'
      : 'CHẠM always strives to deliver perfect Elemental accessories. However, due to the nature of handcrafted items and long-distance shipping, if an item is compromised upon receipt, we provide a 1-to-1 replacement support through our Google Form system below:',
    article1: {
      title: lang === 'vi' ? 'Điều 1. Điều kiện áp dụng Đổi mới Sản phẩm Miễn phí' : 'Article 1. Conditions for Free New Replacement',
      desc: lang === 'vi' 
        ? 'Khách hàng mua online có quyền yêu cầu đổi sản phẩm mới cùng loại trong vòng 3 ngày (72 giờ) kể từ khi đơn vị vận chuyển cập nhật trạng thái "Giao hàng thành công", áp dụng cho các trường hợp sau:'
        : 'Online customers have the right to request a new identical replacement item within 3 days (72 hours) from the delivery confirmed status, applicable for:',
      bullets: [
        lang === 'vi' ? 'Lỗi do đơn vị vận chuyển: Sản phẩm bị nứt vỡ gương, mẻ phôi kẹp, đứt gãy do va đập trong quá trình ship hàng.' : 'Shipping defects: Cracked mirror, chipped clip blank, or breakage due to transit impact.',
        lang === 'vi' ? 'Lỗi khâu đóng gói đơn hàng: Sản phẩm bị giao sai mẫu mã, sai màu sắc phong thủy, thiếu charm hoặc thiếu quà tặng đi kèm so với đơn đặt hàng đã chốt.' : 'Packaging errors: Wrong model, incorrect feng shui color, missing charm, or missing complimentary gifts as finalized in the order.',
        lang === 'vi' ? 'Lỗi nguyên bản từ khâu chế tác: Phôi kẹp bị lỗi chốt, lỗi lò xo, gương bị ố mờ hoặc bong tróc keo ngay tại thời điểm bóc hộp.' : 'Original crafting defects: Faulty hinge, spring, tarnished mirror, or peeling glue at the exact moment of unboxing.',
      ],
      note: lang === 'vi'
        ? 'ĐIỀU KIỆN BẮT BUỘC: Khách hàng phải cung cấp Video bóc hộp (unbox) quay rõ 6 mặt bưu kiện còn nguyên băng keo và quá trình khui hàng phát hiện lỗi để đính kèm vào Google Form đăng ký. CHẠM có quyền từ chối xử lý nếu không có video đối chiếu.'
        : 'MANDATORY CONDITION: The customer must provide an Unboxing Video clearly showing all 6 sides of the intact package and the unboxing process where the defect is discovered, attached in the Google Form. CHẠM reserves the right to refuse processing without a verification video.'
    },
    article2: {
      title: lang === 'vi' ? 'Điều 2. Quy định về việc Hoàn tiền' : 'Article 2. Refund Regulations',
      desc: lang === 'vi'
        ? 'CHẠM ưu tiên tối đa phương án Đổi mới 1-đổi-1 sản phẩm hoàn chỉnh để đảm bảo khách hàng nhận đúng bộ phụ kiện Bản Mệnh của mình. CHẠM chỉ tiến hành hoàn lại tiền qua tài khoản ngân hàng trong các trường hợp bất khả kháng sau:'
        : 'We strictly prioritize a 1-to-1 Replacement approach. CHẠM will only process bank refunds in the following force majeure cases:',
      bullets: [
        lang === 'vi' ? 'Sản phẩm hoặc linh vật thuộc Bản mệnh của khách hàng đã hết hàng tại xưởng và CHẠM không thể tiếp tục chế tác thủ công trong vòng 7 ngày tiếp theo.' : 'The customer\'s elemental product or mascot is out of stock, and CHẠM cannot manufacture it within the next 7 days.',
        lang === 'vi' ? 'Sản phẩm bị lỗi hệ thống nghiêm trọng từ nhà sản xuất trên diện rộng và không có sản phẩm khác thay thế tương đương.' : 'A critical widespread manufacturing defect with no equitable alternative available.'
      ]
    },
    article3: {
      title: lang === 'vi' ? 'Điều 3. Các trường hợp Từ chối Đổi trả' : 'Article 3. Exclusions from Return Policy',
      desc: lang === 'vi'
        ? 'CHẠM được miễn trừ trách nhiệm đổi mới và hoàn tiền đối với các trường hợp:'
        : 'CHẠM is exempt from refund/replacement liabilities for:',
      bullets: [
        lang === 'vi' ? 'Khách hàng gửi thông tin qua Google Form quá mốc 3 ngày quy định kể từ khi nhận hàng thành công. (Mọi vấn đề phát sinh sau mốc này sẽ tự động chuyển sang diện xử lý của [Chính sách Bảo hành kỹ thuật 45 - 60 ngày]).' : 'Requests sent beyond the 3-day window from successful delivery. (Later issues transfer to the [45-60 Day Technical Warranty]).',
        lang === 'vi' ? 'Khách hàng thay đổi ý định cá nhân (không thích mẫu này nữa, muốn đổi sang màu mệnh khác) sau khi sản phẩm đã được CHẠM tiến hành chế tác riêng hoặc khắc tên theo yêu cầu.' : 'Change of mind (disliking the design or wishing for another element) after custom manufacturing or name engraving has begun.',
        lang === 'vi' ? 'Sản phẩm có dấu hiệu đã qua sử dụng, bị hư hỏng, rơi vỡ do lỗi cố ý hoặc vô ý từ phía người dùng sau khi đã bóc hộp thành công.' : 'Items showing signs of use, damage, dropping, or intentional/unintentional mistreatment after successful unboxing.'
      ]
    },
    article4: {
      title: lang === 'vi' ? 'Điều 4. Quy trình Đổi trả trực tuyến qua Google Form' : 'Article 4. Online Return Process via Google Form',
      desc: lang === 'vi'
        ? 'Để hệ thống lưu vết dữ liệu chính xác và xử lý cấp tốc cho khách hàng, quy trình đổi trả được thực hiện qua các bước sau:'
        : 'To ensure accurate tracking and rapid processing, returns follow these steps:',
      bullets: [
        lang === 'vi' ? 'Bước 1 (Đăng ký thông tin): Khách hàng bấm vào nút [ĐIỀN GOOGLE FORM ĐỔI TRẢ NGAY] được tích hợp trên giao diện Website. Khách hàng tiến hành điền: Mã đơn hàng, Số điện thoại mua hàng, Địa chỉ nhận hàng và Tải lên Video bóc hộp báo lỗi.' : 'Step 1 (Registration): Click the integrated [FILL OUT GOOGLE RETURN FORM] button. Enter Order Code, Phone, Delivery Address, and upload the Unboxing Video.',
        lang === 'vi' ? 'Bước 2 (Xử lý đơn): Bộ phận CSKH của CHẠM sẽ kiểm tra dữ liệu trên Google Form. Nếu thông tin và video hợp lệ, CHẠM sẽ chủ động liên hệ qua Số điện thoại/Zalo để thông báo thời gian shipper đến giao dịch.' : 'Step 2 (Processing): Our CS team verifies the form. If valid, we contact you via Phone/Zalo to arrange the courier pickup timeline.',
        lang === 'vi' ? 'Bước 3 (Giao mới - Thu cũ đồng thời): CHẠM điều phối đơn vị vận chuyển mang sản phẩm mới đến tận địa chỉ khách đã khai báo trên Form, đồng thời bốc ngược sản phẩm lỗi về xưởng ngay trong một lần giao dịch để tiết kiệm thời gian cho khách.' : 'Step 3 (Simultaneous Swap): The courier drops the new item and retrieves the defective item in a single trip.'
      ]
    },
    article5: {
      title: lang === 'vi' ? 'Điều 5. Quy định về Chi phí Vận chuyển và Nghĩa vụ các bên' : 'Article 5. Shipping Costs and Obligations',
      desc: lang === 'vi' ? '' : '',
      bullets: [
        lang === 'vi' ? 'Về chi phí vận chuyển: CHẠM chịu 100% chi phí ship 2 chiều (bao gồm phí gửi hàng lỗi về xưởng và phí ship sản phẩm mới đến tay khách). Khách hàng không phải trả thêm bất kỳ khoản phí nào nếu đơn hàng thuộc diện quy định tại Điều 1.' : 'Shipping Costs: CHẠM covers 100% of the 2-way shipping if criteria in Article 1 are met.',
        lang === 'vi' ? 'Nghĩa vụ của CHẠM: Đảm bảo cung cấp sản phẩm đúng mẫu, đúng chất lượng, đúng màu mệnh; hỗ trợ giải quyết khiếu nại của khách hàng trên tinh thần tôn trọng quyền lợi người tiêu dùng.' : 'CHẠM Obligations: Providing the right design, quality, and elemental color, while resolving complaints with maximum respect.',
        lang === 'vi' ? 'Nghĩa vụ của Khách hàng: Thanh toán đầy đủ giá trị đơn hàng; kiểm tra kỹ tình trạng bưu kiện khi nhận từ shipper (nếu thấy móp méo, rách nát có quyền từ chối nhận tại chỗ) và quay video bóc hộp đúng quy định tại Điều 1 để bảo vệ quyền lợi của mình.' : 'Customer Obligations: Full order payment, visually inspecting packages for transit rips, and recording Unboxing Videos.'
      ]
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen border-t border-slate-100 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-6 font-serif text-slate-800">
        
        <div className="text-center mb-12">
          <p className="text-[#E28C9A] tracking-[0.2em] uppercase font-bold text-xs sm:text-sm mb-4">CHẠM</p>
          <h1 className="text-3xl md:text-5xl font-black text-[#00687A] uppercase tracking-wider mb-6">
            {content.title}
          </h1>
          <div className="w-24 h-[2px] bg-[#E28C9A] mx-auto opacity-60"></div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100/60 leading-relaxed text-[15px] space-y-12">
          
          <div className="text-justify text-slate-600 bg-slate-50/50 p-6 rounded-2xl italic border-l-4 border-[#00687A]/20">
            {content.intro}
          </div>

          {[content.article1, content.article2, content.article3, content.article4, content.article5].map((article, i) => (
            <div key={i} className="space-y-4">
              <h2 className="text-xl font-bold text-[#00687A] mb-4">{article.title}</h2>
              {article.desc && <p className="text-slate-600 text-justify mb-4">{article.desc}</p>}
              <ul className="space-y-3">
                {article.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E28C9A] mt-2 shrink-0"></span>
                    <span className="text-slate-600 text-justify leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              {'note' in article && article.note && (
                <div className="mt-4 bg-[#FBF5F2] p-5 rounded-xl border border-[#E28C9A]/30 text-sm italic text-slate-800 font-bold">
                  {article.note}
                </div>
              )}
            </div>
          ))}

          {/* Call to action button */}
          <div className="flex justify-center pt-8 border-t border-slate-100">
             <a
               href="https://forms.gle/YOUR_FORM_ID_HERE"
               target="_blank"
               rel="noopener noreferrer"
               className="bg-[#00687A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#005260] transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
             >
               {lang === 'vi' ? 'ĐIỀN GOOGLE FORM ĐỔI TRẢ NGAY' : 'FILL OUT GOOGLE RETURN FORM'}
             </a>
          </div>

        </div>
      </div>
    </div>
  );
};
