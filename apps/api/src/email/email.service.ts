import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { createEmailClient } from './create-email-client';
import type { EmailClient } from './email.types';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly client: EmailClient | null;
  private readonly fromEmail: string;
  private readonly appName: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    this.fromEmail = process.env.EMAIL_FROM?.trim() || 'onboarding@resend.dev';
    this.appName = process.env.APP_NAME?.trim() || 'Pet Tracker Hub';
    this.client = apiKey ? createEmailClient(apiKey) : null;

    if (!apiKey) {
      this.logger.warn(
        'RESEND_API_KEY is not set. Verification emails will be logged only.',
      );
    }
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    if (!this.client) {
      this.logger.log(`Verification code for ${email}: ${code}`);
      return;
    }

    const { error } = await this.client.emails.send({
      from: this.fromEmail,
      to: email,
      subject: `Your ${this.appName} verification code`,
      html: this.buildVerificationEmailHtml(code),
      text: this.buildVerificationEmailText(code),
    });

    if (error) {
      this.logger.error(
        `Failed to send verification email to ${email}: ${error.message}`,
        JSON.stringify(error),
      );
      throw new InternalServerErrorException(
        'Unable to send verification email',
      );
    }

    this.logger.log(`Verification email sent to ${email}`);
  }

  private buildVerificationEmailText(code: string): string {
    return [
      `Your ${this.appName} verification code is: ${code}`,
      '',
      'This code expires in 15 minutes.',
      '',
      'If you did not create an account, you can ignore this email.',
    ].join('\n');
  }

  private buildVerificationEmailHtml(code: string): string {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
        <h2 style="margin-bottom: 8px;">Verify your email</h2>
        <p>Use this code to finish signing up for ${this.appName}:</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 4px; margin: 24px 0;">
          ${code}
        </p>
        <p style="color: #6b7280;">This code expires in 15 minutes.</p>
        <p style="color: #6b7280;">If you did not create an account, you can ignore this email.</p>
      </div>
    `.trim();
  }
}
