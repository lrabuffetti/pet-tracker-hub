import { Module } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService, EmailService],
})
export class SignUpModule {}
