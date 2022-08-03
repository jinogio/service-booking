import { Doctor } from '../DB/doctor-interface';
import { User } from '../DB/user-interface';
import { Appointment } from '../DB/appointment-interface';
import { DoctorRegisterDto } from '../doctor/doctor-dto/doctor-register-dto';
import { UserRegisterDto } from 'src/users/user-dto/user-register-dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SoftDeleteModel, softDeletePlugin } from 'soft-delete-plugin-mongoose';
import {
  AppointmentDeclineDto,
  AppointmentRegisterDto,
} from './appointment-dto/appointment-register-dto';
@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel('Doctor')
    private readonly doctorModel: SoftDeleteModel<Doctor>,
    @InjectModel('User')
    private readonly userModel: SoftDeleteModel<User>,
    @InjectModel('Appointment')
    private readonly appointmentModel: SoftDeleteModel<Appointment>,
  ) {}

  async registerAppointment(
    appointmentDto: AppointmentRegisterDto,
  ): Promise<Partial<Appointment>> {
    if (!(await this.userModel.findOne({ id: appointmentDto.user }))) {
      throw new NotFoundException('user not found');
    }
    if (!(await this.doctorModel.exists({ id: appointmentDto.doctor }))) {
      throw new NotFoundException('doctor not found');
    }

    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
      0,
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
      999,
    );
    const todaysAppointments = await this.appointmentModel.count({
      doctor: appointmentDto.doctor,
      date: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });
    if (todaysAppointments >= 3) {
      throw new ConflictException(
        'Doctor already has 3 appointments for today',
      );
    }

    const appointment = new this.appointmentModel({
      ...appointmentDto,
      date: new Date().toISOString(),
    });

    return await appointment.save();
  }

  async declineAppointment(
    appointmentDto: AppointmentDeclineDto,
  ): Promise<void> {
    if (
      !(await this.appointmentModel.findOne({ id: appointmentDto.appointment }))
    ) {
      throw new NotFoundException('appointment not found');
    }
    if (!(await this.doctorModel.exists({ id: appointmentDto.doctor }))) {
      throw new NotFoundException('doctor not found');
    }

    await this.appointmentModel.deleteOne({ id: appointmentDto.appointment });
  }
}
