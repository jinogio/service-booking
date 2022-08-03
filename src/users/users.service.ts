import { User } from '../DB/user-interface';
import { UserRegisterDto } from './user-dto/user-register-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SoftDeleteModel, softDeletePlugin } from 'soft-delete-plugin-mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: SoftDeleteModel<User>,
  ) {}

  async registerUser(userRegister: UserRegisterDto): Promise<Partial<User>> {
    const existingUser = await this.userModel.findOne({
      id: userRegister.id,
    });
    if (existingUser) {
      throw new Error('user already register');
    }

    const user = new this.userModel({
      ...userRegister,
    });

    return await user.save();
  }
}
