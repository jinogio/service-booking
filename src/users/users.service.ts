import { User } from '../DB/user-interface';
import { promisify } from 'util';
import { EncryptPassword } from '../utils/encrypt-password';
import { v4 as uuidv4 } from 'uuid';
import { UserRegisterDto } from './user-dto/user-register-dto';
import { UserIdDto } from './user-dto/user-id-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SoftDeleteModel, softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { randomBytes, scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: SoftDeleteModel<User>,
    private readonly encryptPassword: EncryptPassword,
  ) {}

  async registerUser(userRegister: UserRegisterDto): Promise<Partial<User>> {
    const existingUser = await this.userModel.findOne({
      id: uuidv4(),
    });
    if (existingUser) {
      throw new Error('user already register');
    }
    const hashed = await this.encryptPassword.encrypt(userRegister.password);

    const user = new this.userModel({
      ...userRegister,
      password: hashed,
      id: uuidv4(),
    });

    return await user.save();
  }

  async getUser(userId: UserIdDto): Promise<User> {
    const existingUser = await this.userModel.findOne(userId);
    if (!existingUser) {
      throw new Error('user not found');
    }

    return existingUser;
  }
}
