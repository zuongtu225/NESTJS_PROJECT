import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenController } from './authen.controller';
import { User } from '../user/entities/user.entity';
import { AuthenService } from './authen.service';
import { AuthenRepository } from './authen.repository';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthenController],
  providers: [AuthenService, AuthenRepository],
  exports: [AuthenService],
})
export class AuthenModule {}
