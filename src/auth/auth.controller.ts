import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { jwtConstants } from '../constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login method
   * @param email - email
   * @param password - password
   * @param response - response
   */
  @Post('login')
  async login(
    @Body() { email, password }: AuthDto,
    @Res({ passthrough: true }) response,
  ) {
    const token = await this.authService.login(email, password);
    const date = new Date(Date.now() + jwtConstants.expiresTime);

    response.cookie(jwtConstants.tokenCookieKey, `${token.access_token}`, {
      expires: date,
    });
    return token;
  }

  /**
   * Logout method
   */
  @Post('logout')
  async logout(@Res({ passthrough: true }) response) {
    const date = new Date(Date.now());

    response.cookie(jwtConstants.tokenCookieKey, '', {
      expires: date,
    });
  }
}
