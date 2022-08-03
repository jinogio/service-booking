import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctor/doctor.module';
import { AppointmentsModule } from './appointment/appointment.module';

@Module({
  imports: [
    UsersModule,
    DoctorsModule,
    AppointmentsModule,

    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
