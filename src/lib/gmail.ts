export const sendOrderConfirmationEmail = async (accessToken: string, toEmail: string, orderDetails: any) => {
  const subject = `Xác nhận đơn hàng: ${orderDetails.orderId}`;
  
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const messageParts = [
    `From: me`,
    `To: ${toEmail}`,
    `Subject: ${utf8Subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=utf-8`,
    '',
    `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color: #00687A;">Cảm ơn bạn đã đặt hàng tại Chạm!</h2>
        <p>Xin chào ${orderDetails.customerName},</p>
        <p>Đơn hàng <strong>${orderDetails.orderId}</strong> của bạn đã được ghi nhận trên hệ thống.</p>
        
        <h3>Chi tiết đơn hàng:</h3>
        <p>${orderDetails.itemsSummary}</p>
        <p><strong>Tổng tiền:</strong> ${orderDetails.totalAmount}</p>

        <h3>Thông tin giao hàng:</h3>
        <p>
          Tên người nhận: ${orderDetails.customerName}<br/>
          Số điện thoại: ${orderDetails.phone}<br/>
          Địa chỉ: ${orderDetails.address}
        </p>

        <p>Chúng tôi sẽ sớm liên hệ với bạn để xác nhận thông tin.</p>
        <p>Trân trọng,<br/>Đội ngũ Chạm</p>
      </div>
    `,
  ];

  const emailRaw = messageParts.join('\n');
  const base64EncodedEmail = btoa(unescape(encodeURIComponent(emailRaw)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: base64EncodedEmail,
    }),
  });

  if (!response.ok) {
    console.error('Failed to send email:', await response.text());
    throw new Error('Failed to send order confirmation email');
  }

  return response.json();
};
