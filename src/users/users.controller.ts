import {
  HttpException,
  Controller,
  Post,
  Get,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UserRegisterDto } from './user-dto/user-register-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() user: UserRegisterDto) {
    try {
      const result = await this.usersService.registerUser(user);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
