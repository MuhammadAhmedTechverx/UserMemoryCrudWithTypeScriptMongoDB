import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
// const nodemailer = require("nodemailer");

function main(): void {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'e3c23a452e8a93',
      pass: '844c1e58b62b46',
    },
    logger: true,
  })
}

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e3c23a452e8a93',
    pass: '844c1e58b62b46',
  },
})

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
  from = 'abc@gmail.com',
): Promise<boolean> => {
  // send mail with defined transport object
  try {
    await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      // text, // plain text body
      html, // html body
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
