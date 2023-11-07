import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/authen.dto';
import { IUser } from '../user/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IResponseAuth } from './interface/authen.response';
@Injectable()
export class AuthenRepository {
  constructor(
    @InjectRepository(User)
    private authenRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: IUser): Promise<User> {
    return await this.authenRepository.save(body);
  }

  async login(body: LoginDto): Promise<IResponseAuth> {
    const user = await this.authenRepository.findOne({
      where: { email: body.email },
      relations: ['role'],
    });
    if (!user) {
      return {
        accessToken: null,
        success: false,
        data: null,
      };
    }
    const checkPassword = await bcrypt.compare(body.password, user.password);
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role.role,
    };
    const token = checkPassword
      ? await this.jwtService.signAsync(payload)
      : null;
    return {
      accessToken: token,
      success: true,
      data: user,
    };
  }
}
