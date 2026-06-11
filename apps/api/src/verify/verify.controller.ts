import { Body, Controller, Post } from '@nestjs/common';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyService } from './verify.service';

@Controller('verify')
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @Post()
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.verifyService.verifyEmail(verifyEmailDto);
  }
}
