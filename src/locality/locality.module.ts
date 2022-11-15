import { Module } from '@nestjs/common';
import { LocalityController } from './locality.controller';
import { Locality } from './locality.entity';
import { LocalityService } from './locality.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Locality])],
  controllers: [LocalityController],
  providers: [LocalityService],
})
export class LocalityModule {}
