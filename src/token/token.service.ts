import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { AdminTokenDto } from './dto/auth.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(admin) {
    const payload: AdminTokenDto = { user: admin, origin: 'yy-admin' };

    return this.jwtService.sign(payload, {
      secret: jwtConstants.secret_jwt,
      expiresIn: jwtConstants.expiresTime,
    });
  }
}
