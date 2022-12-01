import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { AdminsService } from '../admins/admins.service';
import { Admin } from '../admins/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async findAdmin(email: string) {
    return this.adminsService.findForValidate(email);
  }

  async validateAdmin(
    email: string,
    password: string,
  ): Promise<Omit<Admin, 'passwordHash'>> {
    const admin = await this.findAdmin(email);

    if (!admin) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isCorrectPassword = await compare(password, admin.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверно введён пароль');
    }

    return await this.adminsService.findOne(admin.id);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.validateAdmin(email, password);

    return {
      access_token: await this.jwtService.signAsync({ ...admin }),
    };
  }
}
