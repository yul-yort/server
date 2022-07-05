import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
	return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getTest(): string {
	return this.appService.getHello();
  }
}
