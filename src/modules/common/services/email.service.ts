import { Injectable, OnModuleInit } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EMAIL_TYPES } from '../constants/enums';

@Injectable()
export class EmailService {
  private smtpEmailADDress = 'no-reply@qa.neo.base.echonlabs.com';
  constructor() {}

  private getForgotPasswordResetEmailTemplate(link: string) {
    return `<html>
                <head>
                <title>Forgot Password?</title>
                </head>
                <body style="background-color:#F9F4F3">
                <div style="text-align: center;margin:10px;padding: 10px;border:1px solid #F7F2F1;border-radius:5px;background-color:#ffff">
                    <h2 style="text-align: center;">Forgot Your Password?</h2>
                <p>Hey, we received a request to reset your password.</p>
                <p>Let’s get you a new one!</p>
                    <button style="background-color: #FF5733;border:none;margin:10px;padding:10px;border-radius:5px;color:white;"><a style="color:white;" target="_blank" href="${link}">Reset Password</a></button>
                <p>Didn’t request a password reset? You can ignore this message.</p>
                </div>
                </body>
            </html>`;
  }
  async sendEmail(mailOptions: Mail.Options, type: EMAIL_TYPES, link?: string) {
    const transport = createTransport({
      host: 'box.echonlabs.email',
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: this.smtpEmailADDress,
        pass: 'Echon@2022',
      },
    });

    let email_template = '';
    let subject = '';
    let from = '';

    switch (type) {
      case EMAIL_TYPES.FORGOT_PASSWORD:
        email_template = this.getForgotPasswordResetEmailTemplate(link);
        subject = 'Forgot Password?';
        from = this.smtpEmailADDress;
        break;
      default:
        email_template = 'No email template';
    }

    mailOptions.html = email_template;
    mailOptions.subject = subject;
    mailOptions.from = from;
    await transport.sendMail(mailOptions);
  }
}
