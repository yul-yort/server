import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { jwtConstants } from '../constants';
import { JwtAuthGuard } from './guards/jwt-auth-guard.service';

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
  ): Promise<any> {
    const token = await this.authService.login(email, password);
    const date = new Date(Date.now() + jwtConstants.accessExpiresTime * 1000);

    response.cookie(jwtConstants.tokenCookieKey, `${token.access_token}`, {
      expires: date,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return token;
  }

  /**
   * Logout method
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response): Promise<void> {
    const date = new Date(Date.now());

    response.cookie(jwtConstants.tokenCookieKey, '', {
      expires: date,
    });
  }
}
