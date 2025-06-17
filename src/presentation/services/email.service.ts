import nodemailer from "nodemailer";

interface sendEmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  //todo: attachments
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: process.env.MAILER_EMAIL,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET_KEY,
    },
  });

  async sendEmail({ to, subject, htmlBody, }: sendEmailOptions): Promise<boolean> {
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      });

      console.log(sentInformation);
    } catch (error) {
      console.log(error);
    }

    return true;
  }
}
