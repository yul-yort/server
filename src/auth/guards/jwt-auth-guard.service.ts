import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import jwtDecode from 'jwt-decode';
import { AdminTokenDto } from '../../token/dto/auth.dto';
import { jwtConstants } from '../../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, userData, info, ctx: ExecutionContext) {
    try {
      /**
       * Находим и десериализуем токен.
       */
      const request = ctx.switchToHttp().getRequest();
      const token = request?.cookies[jwtConstants.tokenCookieKey];

      if (!token) {
        throw new UnauthorizedException();
      }

      const decodedToken: AdminTokenDto = jwtDecode(token);

      if (userData && decodedToken.origin === 'yy-admin') {
        return userData;
      }

      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
