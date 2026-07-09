import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";
import { CHARMS, ELEMENTS } from "./src/data";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API route to send email
  app.post("/api/send-preorder-email", async (req, res) => {
    try {
      const { orderId, customerName, customerEmail, customerPhone, orderDetails = [], totalAmount = 0 } = req.body;

      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.warn("Email credentials not configured. Email not sent.");
        return res.json({ success: true, message: "Credentials not configured" });
      }

      const transporter = process.env.SMTP_HOST 
        ? nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            }
          })
        : nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            },
          });

      // Prepare order items HTML with images
      const orderItemsHtml = orderDetails.map((item: any) => {
        let elementImgUrl = item.itemImageUrl || '';
        if (!elementImgUrl) {
          if (item.customization && item.customization.element && item.images && item.images[item.customization.element]) {
            elementImgUrl = item.images[item.customization.element];
          } else if (item.images && Object.values(item.images).length > 0) {
            elementImgUrl = Object.values(item.images)[0] as string;
          }
        }

        return `
          <div style="display: flex; align-items: flex-start; padding: 16px 0; border-bottom: 1px solid #E5E7EB;">
            ${elementImgUrl ? `<img src="${elementImgUrl}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: contain; border-radius: 8px; border: 1px solid #E5E7EB; margin-right: 16px; background-color: #F9FAFB;" />` : ''}
            <div style="flex: 1;">
              <h4 style="margin: 0 0 4px 0; font-size: 16px; color: #111827;">${item.name}</h4>
              <p style="margin: 0 0 4px 0; font-size: 14px; color: #4B5563;">Số lượng: <strong>${item.quantity}</strong></p>
              ${item.customization ? `
                <div style="font-size: 13px; color: #6B7280; line-height: 1.5;">
                  ${item.customization.element ? `Mệnh/Charm: ${item.customization.element}<br/>` : ''}
                  ${item.customization.text ? `Khắc/Dán: "${item.customization.text}"<br/>` : ''}
                  ${item.customization.text2 ? `SP2 Khắc/Dán: "${item.customization.text2}"` : ''}
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');

      const emailContent = `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          
          <!-- Header -->
          <div style="background-color: #00687A; padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">XÁC NHẬN ĐƠN HÀNG</h1>
            <p style="color: #E5F0F2; margin: 10px 0 0 0; font-size: 16px;">Cảm ơn bạn đã lựa chọn Chạm</p>
          </div>

          <div style="padding: 40px 30px;">
            <p style="font-size: 16px; color: #374151; margin-bottom: 24px; line-height: 1.6;">Xin chào <strong>${customerName}</strong>,</p>
            <p style="font-size: 16px; color: #374151; margin-bottom: 24px; line-height: 1.6;">Yêu cầu Pre-order của bạn đã được ghi nhận. Mã đơn hàng của bạn là: <strong style="color: #00687A; font-size: 18px;">${orderId || 'N/A'}</strong>.</p>
            
            <div style="background-color: #F8F9FA; border-left: 4px solid #00687A; padding: 16px; margin-bottom: 32px;">
              <p style="margin: 0; font-size: 14px; color: #4B5563; line-height: 1.6;">
                <strong>LƯU Ý VỀ THANH TOÁN:</strong> Đây là email xác nhận ghi nhận đơn hàng tự động. Chúng tôi sẽ kiểm tra và gửi email xác nhận <strong>đã thanh toán thành công</strong> sau (nếu bạn chọn chuyển khoản/MoMo). Thời gian chờ sản xuất (2-5 ngày) sẽ được tính bắt đầu từ lúc có email xác nhận thanh toán thành công.
              </p>
            </div>
            
            <h3 style="font-size: 18px; color: #111827; border-bottom: 2px solid #E5E7EB; padding-bottom: 10px; margin-bottom: 20px;">Chi tiết đơn hàng</h3>
            
            <div style="margin-bottom: 24px;">
              ${orderItemsHtml}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; background-color: #F9FAFB; padding: 16px 20px; border-radius: 8px; margin-bottom: 32px;">
              <span style="font-size: 16px; color: #4B5563; font-weight: 500;">Tổng cộng (dự kiến)</span>
              <span style="font-size: 20px; color: #990000; font-weight: 700;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
            </div>

            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />

            <h3 style="font-size: 16px; color: #111827; margin-bottom: 16px;">Thanh toán lại (nếu cần)</h3>
            <p style="font-size: 14px; color: #4B5563; line-height: 1.6; margin-bottom: 16px;">Trong trường hợp bạn chưa thanh toán được, bạn có thể quét mã QR dưới đây. Vui lòng ghi rõ nội dung chuyển khoản theo cú pháp: <strong>${customerName} ${customerPhone} ${orderId || 'Mã Đơn Hàng'}</strong>.</p>
            
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/1d210243f851f1f56d6a41ba5c73144ff8636c8f/730775708_1725132161906814_8498991417054631504_n.jpg" alt="MoMo QR Code" style="width: 200px; height: 200px; object-fit: contain; border: 1px solid #E5E7EB; border-radius: 8px; padding: 8px;" />
              <p style="margin-top: 8px; font-size: 14px; color: #00687A; font-weight: bold;">MoMo - Quét mã để thanh toán</p>
            </div>

            <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua:</p>
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #00687A; font-weight: 500;">
                Email: <a href="mailto:cham.elements@gmail.com" style="color: #00687A; text-decoration: none;">cham.elements@gmail.com</a>
              </p>
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #00687A; font-weight: 500;">
                Hotline: 0918 620 232 (Ms. Hà Anh) - 0365 092 373 (Mr. Anh Khôi)
              </p>
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #00687A; font-weight: 500;">
                Facebook: <a href="https://www.facebook.com/profile.php?id=61591049410705" style="color: #00687A; text-decoration: none;">Fanpage Facebook</a>
              </p>
              <p style="margin: 0; font-size: 14px; color: #00687A; font-weight: 500;">
                TikTok: <a href="https://www.tiktok.com/@cham.elements?_r=1&_t=ZS-97WdJdLmO6H" style="color: #00687A; text-decoration: none;">TikTok</a>
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #111827; padding: 24px 20px; text-align: center;">
            <p style="color: #9CA3AF; margin: 0; font-size: 12px; letter-spacing: 0.5px;">&copy; ${new Date().getFullYear()} Chạm. All rights reserved.</p>
            <p style="color: #6B7280; margin: 8px 0 0 0; font-size: 12px;">Được chế tác với sự tỉ mỉ và tận tâm.</p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Chạm" <${process.env.GMAIL_USER}>`,
        to: customerEmail,
        subject: "[Chạm] Xác nhận yêu cầu Pre-order",
        html: emailContent,
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email", details: error.message });
    }
  });

  // API route to send contact us email
  app.post("/api/contact-us", async (req, res) => {
    try {
      const { fullName, email, subject, message } = req.body;

      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.warn("Email credentials not configured. Contact email not sent.");
        return res.json({ success: true, message: "Credentials not configured" });
      }

      const transporter = process.env.SMTP_HOST 
        ? nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            }
          })
        : nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            },
          });

      const emailContent = `
        <h1>Tin nhắn mới từ ${fullName}</h1>
        <p><strong>Khách hàng:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Chủ đề:</strong> ${subject || 'Không có'}</p>
        <p><strong>Nội dung:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `;

      await transporter.sendMail({
        from: `"Chạm Website" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER, // Send back to our main email
        subject: `[Liên Hệ] ${subject || 'Có tin nhắn mới từ khách hàng'}`,
        html: emailContent,
        replyTo: email,
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ error: "Failed to send contact email", details: error.message });
    }
  });

  // API route to record preorder to Google Sheets
  app.post("/api/record-preorder-sheet", async (req, res) => {
    try {
      const { orderId, userId, customerInfo, items, subtotal, packagingFee, total, discountAmount, discountCode, wrappingOption, paymentMethod, deliveryMethod, createdAt } = req.body;

      if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
        console.warn("Google Sheets credentials not configured. Not saving to sheet.");
        return res.json({ success: true, message: "Credentials not configured" });
      }

      // Format private key (replace literal \n with actual newlines if needed)
      const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

      const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      const sheets = google.sheets({ version: 'v4', auth });
      
      const itemsString = items.map((item: any) => {
        const c = item.customization || {};
        if (c.partnerElement && !c.comboId) {
          c.comboId = 'mirror_combo';
        }
        
        let details = [];
        
        if (c.element) {
          const el = ELEMENTS.find(e => e.type === c.element);
          details.push(`Mệnh: ${el ? el.nameVi : c.element}`);
        }
        
        if (c.text) {
          let styleName = 'Khắc/dán';
          if (c.letteringStyle === 'embossed') styleName = 'Chữ nổi';
          else if (c.letteringStyle === '3D') styleName = 'Chữ 3D';
          else if (c.letteringStyle === 'sticker') styleName = 'Chữ dán';
          
          let color = c.textStyleOption || '';
          if (color === 'silver') color = 'Bạc';
          if (color === 'gold') color = 'Vàng';
          if (color === 'white') color = 'Trắng';
          if (color === 'pink') color = 'Hồng';
          
          details.push(`${styleName}: "${c.text}" (Màu: ${color})`);
        }
        
        if (c.selectedZodiacCharmId) {
          const charm = CHARMS.find(ch => ch.id === c.selectedZodiacCharmId);
          if (charm) details.push(`Charm: ${charm.vietnameseName || charm.name}`);
        }
        
        if (c.selectedStickerIds && c.selectedStickerIds.length > 0) {
          const stickerNames = c.selectedStickerIds.map((id: string) => {
            const st = CHARMS.find(ch => ch.id === id);
            return st ? (st.vietnameseName || st.name) : id;
          }).join(', ');
          details.push(`Trang trí: ${stickerNames}`);
        }
        
        if (c.partnerElement) {
          const sp2Label = c.comboId === 'mirror_combo' ? 'Gương (SP2)' : 'SP2';
          details.push(`--- ${sp2Label} ---`);
          const el = ELEMENTS.find(e => e.type === c.partnerElement);
          details.push(`Mệnh ${sp2Label}: ${el ? el.nameVi : c.partnerElement}`);
        }
        
        if (c.text2) {
          const sp2Label = c.comboId === 'mirror_combo' ? 'Gương (SP2)' : 'SP2';
          let styleName = `Khắc/dán ${sp2Label}`;
          if (c.letteringStyle2 === 'embossed') styleName = `Chữ nổi ${sp2Label}`;
          else if (c.letteringStyle2 === '3D') styleName = `Chữ 3D ${sp2Label}`;
          else if (c.letteringStyle2 === 'sticker') styleName = `Chữ dán ${sp2Label}`;
          
          let color = c.textStyleOption2 || '';
          if (color === 'silver') color = 'Bạc';
          if (color === 'gold') color = 'Vàng';
          if (color === 'white') color = 'Trắng';
          if (color === 'pink') color = 'Hồng';
          
          details.push(`${styleName}: "${c.text2}" (Màu: ${color})`);
        }
        
        if (c.selectedZodiacCharmId2) {
          const sp2Label = c.comboId === 'mirror_combo' ? 'Gương (SP2)' : 'SP2';
          const charm = CHARMS.find(ch => ch.id === c.selectedZodiacCharmId2);
          if (charm) details.push(`Charm ${sp2Label}: ${charm.vietnameseName || charm.name}`);
        }
        
        if (c.selectedStickerIds2 && c.selectedStickerIds2.length > 0) {
          const sp2Label = c.comboId === 'mirror_combo' ? 'Gương (SP2)' : 'SP2';
          const stickerNames = c.selectedStickerIds2.map((id: string) => {
            const st = CHARMS.find(ch => ch.id === id);
            return st ? (st.vietnameseName || st.name) : id;
          }).join(', ');
          details.push(`Trang trí ${sp2Label}: ${stickerNames}`);
        }
        
        let itemName = item.product.vietnameseName || item.product.name;
        if (c.comboId === 'couple_combo') {
          itemName = `Combo Chạm Cùng Nhau (${itemName})`;
        } else if (c.comboId === 'mirror_combo') {
          itemName = `Combo Chạm Ánh Nhìn (${itemName} & Gương)`;
        }
        
        return `${itemName} (x${item.quantity})\n  ${details.join('\n  ')}`;
      }).join('\n\n');

      const dateStr = new Date(createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

      // Columns: Mã đơn, Thời gian, Tên KH, Email KH, SĐT, Địa chỉ, Ghi chú, Sản phẩm, Tạm tính, Giảm giá, Tổng tiền, TT thanh toán, Giao hàng, Tùy chọn gói, UID Khách hàng, Email KH, Người đối soát, Trạng thái TT, Minh chứng TT
      const row = [
        orderId || '-',
        dateStr,
        customerInfo.name || '',
        customerInfo.email || '',
        customerInfo.phone || '',
        deliveryMethod === 'direct' ? 'UEH - Cơ sở B - 279 Nguyễn Tri Phương, Phường Diên Hồng, TP.HCM' : `${customerInfo.address}${customerInfo.ward ? `, ${customerInfo.ward}` : ''}, ${customerInfo.district}${customerInfo.province ? `, ${customerInfo.province}` : ''}`,
        customerInfo.note || '',
        itemsString,
        subtotal,
        discountAmount ? `${discountAmount} (${discountCode || ''})` : '0',
        total,
        paymentMethod,
        deliveryMethod,
        wrappingOption === 'giftBox' ? 'Hộp Quà Thượng Hạng' : 'Hộp Gói Tiêu Chuẩn',
        userId || 'Guest',
        customerInfo.email || '', // Thêm email khách hàng ở cột ngay sau UID khách hàng
        '', // Người đối soát
        req.body.paymentStatus || 'Chưa thanh toán',
        req.body.paymentProofUrl ? `=HYPERLINK("${req.body.paymentProofUrl}", "Xem ảnh")` : ''
      ];

      const sheetInfo = await sheets.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID });
      const firstSheetName = sheetInfo.data.sheets?.[0]?.properties?.title || 'Sheet1';

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${firstSheetName}!A:S`, // Update range to S
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [row]
        }
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error writing to Google Sheets:", error);
      res.status(500).json({ error: "Failed to write to Google Sheets", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
