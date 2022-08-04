import {
  HttpException,
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  HttpStatus,
  Request,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRegisterDto } from './user-dto/user-register-dto';
import { UserIdDto } from './user-dto/user-id-dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req) {
    try {
      return req.user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param() userId: UserIdDto) {
    try {
      const profile = await this.usersService.getUser(userId);
      console.log(profile);
      return profile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
