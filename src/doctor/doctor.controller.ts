import {
  HttpException,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { DoctorRegisterDto } from './doctor-dto/doctor-register-dto';
import { DoctorsService } from './doctor.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DoctorIdDto } from './doctor-dto/doctor-id.dto';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginDoctor(@Request() req) {
    try {
      return req.doctor;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param() doctorId: DoctorIdDto) {
    try {
      const profile = await this.doctorService.getDoctor(doctorId);
      return profile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
