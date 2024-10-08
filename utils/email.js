const nodemailer = require('nodemailer');

const sendEmail = async options => {

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Ashwin <ashwin@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;