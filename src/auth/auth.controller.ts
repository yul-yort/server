import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

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

    response.cookie('access_token', `${token.access_token}`);
    return token;
  }
}
