import { Module } from '@nestjs/common';
import { LocalityController } from './locality.controller';

@Module({
  controllers: [LocalityController]
})
export class LocalityModule {}
