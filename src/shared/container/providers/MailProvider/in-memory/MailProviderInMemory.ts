import { IMailProvider, SendEmailVariables } from "../IMailProvider";

export class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  async sendEmail(
    to: string,
    subject: string,
    variables: SendEmailVariables,
    path: string,
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
