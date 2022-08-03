import {
  HttpException,
  Controller,
  Post,
  Get,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  AppointmentDeclineDto,
  AppointmentRegisterDto,
} from './appointment-dto/appointment-register-dto';
import { AppointmentsService } from './appiontment.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @Post('register')
  async register(@Body() appointment: AppointmentRegisterDto) {
    const result = await this.appointmentService.registerAppointment(
      appointment,
    );
    return result;
  }

  @Post('decline')
  @HttpCode(204)
  async decline(@Body() appointment: AppointmentDeclineDto) {
    await this.appointmentService.declineAppointment(appointment);
  }
}
