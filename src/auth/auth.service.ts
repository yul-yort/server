import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(email: string) {
    return this.usersService.findForValidate(email);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email'>> {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверно ввден пароль');
    }

    return { email: user.email };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const { email: validatedEmail } = await this.validateUser(email, password);

    const payload = { validatedEmail };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
