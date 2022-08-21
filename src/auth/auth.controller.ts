import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log(authService);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  //Запрашивать через Req
  async login(@Body() { login, password }: AuthDto, @Res({ passthrough: true }) response) {
    console.log(response.body);
    console.log(login)
    const { email } = await this.authService.validateUser(login, password);

    const token = await this.authService.login(email)
    response.cookie('token', `${token.access_token}`);
  }
}
