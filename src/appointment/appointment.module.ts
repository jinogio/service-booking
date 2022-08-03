import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment } from 'src/DB/appointment-interface';
// import { EncryptPassword } from 'src/utils/encrypt-password';
// import { AuthModule } from '../auth/auth.module';
import { AppointmentSchema } from '../DB/appointment.schema';
import { AppointmentsController } from '../appointment/appointment.controller';
import { AppointmentsService } from './appiontment.service';
import { DoctorSchema } from '../DB/doctor.schema';
import { UserSchema } from '../db/user.schema';
import { NotificationService } from './notification.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Appointment', schema: AppointmentSchema },
      { name: 'Doctor', schema: DoctorSchema },
      { name: 'User', schema: UserSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsController, NotificationService],
  exports: [AppointmentsService, NotificationService],
})
export class AppointmentsModule {}
