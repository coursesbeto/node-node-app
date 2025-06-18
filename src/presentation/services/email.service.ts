import nodemailer from "nodemailer";

interface Atachment {
  filename: string;
  path: string;
}
interface sendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Atachment[];
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: process.env.MAILER_EMAIL,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET_KEY,
    },
  });

  async sendEmail({ to, subject, htmlBody, attachments, }: sendEmailOptions): Promise<boolean> {
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log(sentInformation);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // metodo para enviar correos con archivos adjuntos
  sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Correo HTML Bonito</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f4f4;">
            <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse; background-color:#ffffff; font-family:Arial, sans-serif;">
            <tr>
                <td align="center" bgcolor="#4CAF50" style="padding: 40px 0; color: white; font-size: 28px; font-weight: bold;">
                ¡Bienvenido a Nuestra Comunidad!
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; color: #333;">
                <h2 style="margin-top:0;">Hola [Nombre],</h2>
                <p style="font-size:16px; line-height:1.6;">
                    Gracias por unirte a nosotros. Estamos encantados de tenerte a bordo. Aquí tienes algunas cosas que puedes hacer a continuación:
                </p>
                <ul style="font-size:16px; line-height:1.6; padding-left: 20px;">
                    <li>Explora nuestras funciones</li>
                    <li>Visita tu perfil</li>
                    <li>Empieza a disfrutar de la experiencia</li>
                </ul>
                <p style="font-size:16px;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
                <p style="font-size:16px;">— El equipo de [Tu Empresa]</p>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#eeeeee" style="padding: 20px; font-size:12px; color:#777;">
                © 2025 Tu Empresa, Todos los derechos reservados.<br>
                <a href="#" style="color:#4CAF50; text-decoration:none;">Cancelar suscripción</a>
                </td>
            </tr>
            </table>
        </body>
        </html>`;

    const attachments: Atachment[] = [
      {
        filename: "logs-all.log",
        path: "logs/logs-all.log",
      },
      {
        filename: "logs-medium.log",
        path: "logs/logs-medium.log",
      },
      {
        filename: "logs-high.log",
        path: "logs/logs-high.log",
      },
    ];


    this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
