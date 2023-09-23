export type SendEmailVariables = {
  [x: string]: string | number;
};
export interface IMailProvider {
  sendEmail(
    to: string,
    subject: string,
    variables: Variables,
    path: string,
  ): Promise<void>;
}
