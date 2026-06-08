import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendVerificationCode(email: string, code: string): Promise<void> {
    // TODO: replace with a real email provider (Resend, SendGrid, etc.)
    this.logger.log(`Verification code for ${email}: ${code}`);
  }
}
