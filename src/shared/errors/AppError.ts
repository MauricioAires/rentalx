export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
