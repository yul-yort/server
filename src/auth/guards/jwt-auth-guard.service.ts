import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import jwtDecode from 'jwt-decode';
import { ADMIN_ORIGIN, AdminTokenDto } from '../../token/dto/auth.dto';
import { jwtConstants } from '../../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, userData, info, ctx: ExecutionContext) {
    /**
     * Находим и десериализуем токен.
     */
    const request = ctx.switchToHttp().getRequest();
    const token = request?.cookies[jwtConstants.tokenCookieKey];

    // TODO вынести в в middleware?
    const logout = () => {
      request.res.clearCookie(jwtConstants.tokenCookieKey);
      throw new UnauthorizedException();
    };

    if (!token) {
      logout();
    }

    const decodedToken: AdminTokenDto = jwtDecode(token);

    if (userData && decodedToken.origin === ADMIN_ORIGIN) {
      return userData;
    }

    logout();
  }
}
