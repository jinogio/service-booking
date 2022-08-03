import { Doctor } from '../DB/doctor-interface';
import { DoctorRegisterDto } from './doctor-dto/doctor-register-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SoftDeleteModel, softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel('Doctor')
    private readonly doctorModel: SoftDeleteModel<Doctor>,
  ) {}

  async registerDoctor(
    doctorRegister: DoctorRegisterDto,
  ): Promise<Partial<Doctor>> {
    const existingDoctor = await this.doctorModel.findOne({
      id: uuidv4(),
    });
    if (existingDoctor) {
      throw new Error('user already register');
    }

    const doctor = new this.doctorModel({
      id: uuidv4(),
      ...doctorRegister,
    });

    return await doctor.save();
  }
}
