import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../db/user-interface';
import { Doctor } from 'src/DB/doctor-interface';
import { SoftDeleteModel, softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { EncryptPassword } from 'src/utils/encrypt-password';
import { InjectModel } from '@nestjs/mongoose';
import { doc } from 'prettier';

@Injectable()
export class AuthService {
  constructor(
    private encryptPassword: EncryptPassword,
    private jwtService: JwtService,
    @InjectModel('User') private userModel: SoftDeleteModel<User>,
    @InjectModel('Doctor') private doctorModel: SoftDeleteModel<Doctor>,
  ) {}

  private async checkRole(email: string): Promise<Doctor | User | null> {
    const user = await this.userModel.findOne({ email });
    const doctor = await this.doctorModel.findOne({ email });

    return doctor || user;
  }

  async login(email: string, password: string) {
    const user = await this.checkRole(email);

    if (!user) return;
    const { password: dbPassword } = user;

    const isPasswordValid = await this.encryptPassword.comparePassword(
      dbPassword,
      password,
    );
    if (!isPasswordValid) return;

    return this.getToken(user);
  }

  private async getToken(profile: User | Doctor) {
    const payload = { email: profile.email };
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.KEY }),
    };
  }
}
