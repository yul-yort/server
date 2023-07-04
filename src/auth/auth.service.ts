import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { AdminsService } from '../admins/admins.service';
import { Admin } from '../admins/admin.entity';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly tokenService: TokenService,
  ) {}

  async validateAdmin(
    email: string,
    password: string,
  ): Promise<Omit<Admin, 'passwordHash'>> {
    const admin = await this.adminsService.findForValidate(email);

    if (!admin) {
      throw new NotFoundException('Пользователь не найден');
    }

    const validPassword = await compare(password, admin.passwordHash);

    if (!validPassword) {
      throw new UnauthorizedException('Неверно введён пароль');
    }

    return await this.adminsService.findOne(admin.id);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    admin: Omit<Admin, 'passwordHash'>;
  }> {
    const admin = await this.validateAdmin(email, password);
    const access_token = await this.tokenService.generateAccessJwtToken(admin);

    return {
      access_token,
      admin,
    };
  }
}
