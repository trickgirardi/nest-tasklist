import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    this.verifyConnection().catch((error) => {
      console.error(
        'Erro ao verificar conexão com o servidor de email:',
        error,
      );
    });
  }

  private async verifyConnection() {
    try {
      await this.transporter.verify();
    } catch (error) {
      console.error(
        'Erro ao verificar conexão com o servidor de email:',
        error,
      );
    }
  }

  async sendConfirmationEmail(
    email: string,
    name: string,
    confirmationToken: string,
  ): Promise<nodemailer.SentMessageInfo> {
    const confirmationUrl = `${process.env.APP_URL}/users/confirm/${confirmationToken}`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Confirmação de email',
      html: this.generateConfirmationEmailTemplate(name, confirmationUrl),
      text: this.generateConfirmationEmailText(name, confirmationUrl),
    };

    try {
      return this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar email de confirmação:', error);
      throw new Error('Erro ao enviar email de confirmação');
    }
  }

  private generateConfirmationEmailTemplate(
    name: string,
    confirmationUrl: string,
  ): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirme sua conta</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background: #28a745; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
          }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bem-vindo ao TaskList!</h1>
          </div>
          <div class="content">
            <h2>Olá, ${name}!</h2>
            <p>Obrigado por criar sua conta na TaskList!</p>
            <p>Para começar a usar nossa plataforma, você precisa confirmar seu email clicando no botão abaixo:</p>
            <p style="text-align: center;">
              <a href="${confirmationUrl}" class="button">✅ Confirmar Email</a>
            </p>
            <p>Ou copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">
              ${confirmationUrl}
            </p>
            <p><strong>⏰ Este link expira em 24 horas.</strong></p>
            <p>Se você não criou esta conta, pode ignorar este email.</p>
          </div>
          <div class="footer">
            <p>TaskList - Organize suas tarefas com eficiência</p>
            <p>Este é um email automático, não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateConfirmationEmailText(
    name: string,
    confirmationUrl: string,
  ): string {
    return `
      Olá ${name}!
      
      Bem-vindo ao TaskList!
      
      Para confirmar sua conta, acesse o link abaixo:
      ${confirmationUrl}
      
      Este link expira em 24 horas.
      
      Se você não criou esta conta, ignore este email.
      
      Atenciosamente,
      Equipe TaskList
    `;
  }
}
