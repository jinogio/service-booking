import { Doctor } from '../DB/doctor-interface';
import { DoctorRegisterDto } from './doctor-dto/doctor-register-dto';
import { DoctorIdDto } from './doctor-dto/doctor-id.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SoftDeleteModel, softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { v4 as uuidv4 } from 'uuid';
import { EncryptPassword } from 'src/utils/encrypt-password';
@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel('Doctor')
    private readonly doctorModel: SoftDeleteModel<Doctor>,
    private readonly passwordService: EncryptPassword,
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

    const encryptedPassword = await this.passwordService.encrypt(
      doctorRegister.password,
    );

    const doctor = new this.doctorModel({
      ...doctorRegister,
      id: uuidv4(),
      password: encryptedPassword,
    });

    return await doctor.save();
  }

  async getDoctor(doctorId: DoctorIdDto): Promise<Doctor> {
    const existingDoctor = await this.doctorModel.findOne(doctorId);
    if (!existingDoctor) {
      throw new Error('doctor not found');
    }

    return existingDoctor;
  }
}
