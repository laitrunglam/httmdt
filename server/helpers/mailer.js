const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendConfirmationEmail(to, token) {
  const confirmUrl = `${process.env.FRONTEND_URL}/confirm-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Xác nhận đăng ký tài khoản',
    html: `<p>Vui lòng xác nhận email của bạn bằng cách nhấn vào liên kết sau:</p><a href="${confirmUrl}">${confirmUrl}</a>`
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationEmail };
