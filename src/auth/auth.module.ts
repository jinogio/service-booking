import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { EncryptPassword } from 'src/utils/encrypt-password';
import { UsersModule } from 'src/users/users.module';
import { DoctorsModule } from 'src/doctor/doctor.module';
import { UserSchema } from 'src/db/user.schema';
import { DoctorSchema } from 'src/DB/doctor.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),

    forwardRef(() => UsersModule),
    forwardRef(() => DoctorsModule),

    PassportModule,
    JwtModule.register({
      secret: process.env.KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    EncryptPassword,
    AuthService,
    JwtStrategy,
    LocalAuthGuard,
    LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
