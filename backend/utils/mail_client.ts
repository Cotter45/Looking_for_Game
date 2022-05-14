"use strict"
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN
  }
});

// EXAMPLE USE
// const mailOptions = {
//   from: 'coe.landscapes@gmail.com',
//   to: 'coe.landscapes@gmail.com',
//   subject: 'TEST RUN',
//   text: 'HI FROM SERVER',
//   attachments: []
// }

// transporter.sendMail(mailOptions, (err, data) => {
//   if (err) console.log(err);
//   else console.log("Email sent succesfully");
// })

export = transporter;