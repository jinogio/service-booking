import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EncryptPassword } from 'src/utils/encrypt-password';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../db/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],

  controllers: [UsersController],
  providers: [UsersService, UsersController, EncryptPassword],
  exports: [UsersService],
})
export class UsersModule {}
