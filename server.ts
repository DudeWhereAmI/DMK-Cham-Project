import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route to send email
  app.post("/api/send-preorder-email", async (req, res) => {
    try {
      const { customerName, customerEmail, orderDetails, totalAmount } = req.body;

      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        // Just mock success if not configured, allowing app to still function
        console.warn("Gmail credentials not configured. Email not sent.");
        return res.json({ success: true, message: "Credentials not configured" });
      }

      // Recreate transporter inside the route to pick up any hot-loaded environment variables
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''), // Remove any accidental spaces in app password
        },
      });

      try {
        console.log("Verifying transporter connection...");
        const verifyResult = await transporter.verify();
        console.log("Transporter verification result:", verifyResult);
      } catch (verifyError) {
        console.error("Transporter verification failed:", verifyError);
        return res.status(500).json({ error: "Failed to verify email transporter", details: verifyError });
      }

      const emailContent = `
        <h1>Cảm ơn bạn đã Pre-order tại Chạm!</h1>
        <p>Xin chào ${customerName},</p>
        <p>Yêu cầu Pre-order của bạn đã được ghi nhận. Tụi mình sẽ liên hệ lại với bạn khi các sản phẩm sẵn sàng mở bán chính thức.</p>
        
        <h2>Chi tiết yêu cầu của bạn:</h2>
        <ul>
          ${orderDetails.map((item: any) => `
            <li>
              <strong>${item.name}</strong> x${item.quantity}<br/>
              <em>Màu sắc:</em> ${item.customization?.color || 'Mặc định'}<br/>
              <em>Kiểu dáng:</em> ${item.customization?.letteringStyle || 'Mặc định'}<br/>
              <em>Nội dung khắc:</em> ${item.customization?.customText || 'Không có'}<br/>
            </li>
          `).join('')}
        </ul>

        <p><strong>Tổng cộng (dự kiến):</strong> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</p>

        <div style="background-color: #FFF2EF; border: 1px solid #E28C9A; padding: 15px; margin-top: 20px; text-align: center;">
          <h3 style="color: #990000; margin-top: 0;">Mã Giảm Giá 20% Dành Riêng Cho Bạn</h3>
          <p>Sử dụng mã dưới đây khi ứng dụng mở bán chính thức để nhận ngay ưu đãi giảm 20% cho toàn bộ sản phẩm.</p>
          <div style="font-size: 24px; font-weight: bold; color: #990000; tracking: 0.1em;">CHAMISBYEUCOHOA</div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Chạm" <${process.env.GMAIL_USER}>`,
        to: customerEmail,
        subject: "Xác nhận Pre-order & Quà tặng mã giảm giá từ Chạm",
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
        console.warn("Gmail credentials not configured. Contact email not sent.");
        return res.json({ success: true, message: "Credentials not configured" });
      }

      const transporter = nodemailer.createTransport({
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
