import { Doctor } from '../DB/doctor-interface';
import { User } from '../DB/user-interface';
import { Appointment } from '../DB/appointment-interface';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectModel('Doctor')
    private readonly doctorModel: SoftDeleteModel<Doctor>,
    @InjectModel('User')
    private readonly userModel: SoftDeleteModel<User>,
    @InjectModel('Appointment')
    private readonly appointmentModel: SoftDeleteModel<Appointment>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async dailyCron() {
    this.logger.log('daily');
    const today = new Date();
    const startOfTomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
      0,
    );
    startOfTomorrow.setDate(today.getDate() + 1);
    const endOfTomorrow = new Date(
      startOfTomorrow.getFullYear(),
      startOfTomorrow.getMonth(),
      startOfTomorrow.getDate(),
      23,
      59,
      59,
      999,
    );

    const appointments = await this.appointmentModel.find({
      date: {
        $gte: startOfTomorrow,
        $lte: endOfTomorrow,
      },
    });

    for (const appointment of appointments) {
      const user = await this.userModel.findOne({ id: appointment.user });
      const doctor = await this.doctorModel.findOne({ id: appointment.doctor });

      this.logger.log(
        `${today.toDateString()} | Привет ${
          user.name
        }! Напоминаем что вы записаны к ${
          doctor.spec
        } завтра в ${appointment.date.toDateString()}!`,
      );
    }
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async twoHoursCron() {
    const today = new Date();
    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours(),
      0,
      0,
      0,
    );
    const end = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      start.getHours(),
      59,
      59,
      999,
    );
    end.setHours(start.getHours() + 2);

    const appointments = await this.appointmentModel.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });

    for (const appointment of appointments) {
      const user = await this.userModel.findOne({ id: appointment.user });
      const doctor = await this.doctorModel.findOne({ id: appointment.doctor });

      this.logger.log(
        `${today.toDateString()} | Привет ${user.name}! Вам через 2 часа к ${
          doctor.spec
        } в ${appointment.date.toDateString()}!`,
      );
    }
  }
}
