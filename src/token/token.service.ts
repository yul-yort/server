import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { AdminTokenDto } from './dto/auth.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessJwtToken(admin) {
    const payload: AdminTokenDto = { user: admin, origin: 'yy-admin' };

    return this.jwtService.sign(payload, {
      secret: jwtConstants.access_secret_jwt,
      expiresIn: jwtConstants.accessExpiresTime,
    });
  }
}
