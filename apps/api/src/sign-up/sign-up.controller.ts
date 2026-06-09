import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignUpService } from './sign-up.service';

@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpService.signUp(signUpDto);
  }
}
