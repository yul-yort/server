import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocalityModule } from './locality/locality.module';

@Module({
  imports: [AuthModule, LocalityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
