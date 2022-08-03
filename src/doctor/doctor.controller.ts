import {
  HttpException,
  Controller,
  Post,
  Get,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { DoctorRegisterDto } from './doctor-dto/doctor-register-dto';
import { DoctorsService } from './doctor.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) {}

  @Post('register')
  async registerUser(@Body() doctor: DoctorRegisterDto) {
    try {
      const result = await this.doctorService.registerDoctor(doctor);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
