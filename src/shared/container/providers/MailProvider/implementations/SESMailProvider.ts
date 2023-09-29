import { injectable } from "tsyringe";
import { SES } from "aws-sdk";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "node:fs";

import { IMailProvider, SendEmailVariables } from "../IMailProvider";

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_SES_REGION,
      }),
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    variables: SendEmailVariables,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      //  Aqui deve ser um email valido verificado pela AWS
      // https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHTML,
    });
  }
}
