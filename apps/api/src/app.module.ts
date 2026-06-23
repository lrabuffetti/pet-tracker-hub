import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { PetsModule } from './pets/pets.module';
import { PrismaModule } from './prisma/prisma.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { UploadsModule } from './uploads/uploads.module';
import { VerifyModule } from './verify/verify.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SignUpModule,
    VerifyModule,
    LoginModule,
    PetsModule,
    MedicalRecordsModule,
    DashboardModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
