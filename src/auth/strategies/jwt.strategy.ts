import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //TODO прокинуть конфиги сюда
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const token = request?.cookies[jwtConstants.tokenCookieKey];
          if (!token) {
            return null;
          }

          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.access_secret_jwt,
    });
  }

  async validate(payload: any) {
    return { admin: { ...payload.user } };
  }
}
