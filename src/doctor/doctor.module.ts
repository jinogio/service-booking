import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EncryptPassword } from 'src/utils/encrypt-password';
import { AuthModule } from '../auth/auth.module';
import { DoctorSchema } from '../DB/doctor.schema';
import { DoctorsController } from './doctor.controller';
import { DoctorsService } from './doctor.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),

    forwardRef(() => AuthModule),
  ],

  controllers: [DoctorsController],
  providers: [DoctorsService, DoctorsController, EncryptPassword],
  exports: [DoctorsService],
})
export class DoctorsModule {}
