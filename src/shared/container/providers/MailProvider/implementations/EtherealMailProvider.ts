import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      text: body,
      html: body,
    });

    console.log("Message sent: %s", message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
