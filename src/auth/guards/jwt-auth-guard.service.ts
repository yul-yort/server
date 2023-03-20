import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import jwtDecode from 'jwt-decode';
import { AdminTokenDto } from '../../token/dto/auth.dto';

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
      const authorizationIdx = request.rawHeaders.indexOf('Authorization');
      const token = request.rawHeaders[authorizationIdx + 1].split(' ')[1];

      if (authorizationIdx < 0 || !token) {
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
