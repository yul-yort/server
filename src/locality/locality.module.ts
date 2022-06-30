import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { LocalityController } from './locality.controller';
import { LocalityModel } from './locality.model';
import { LocalityService } from './locality.service';

@Module({
  controllers: [LocalityController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: LocalityModel,
        schemaOptions: {
          collection: 'Locality'
        }
      }
    ])
  ],
  providers: [LocalityService]
})
export class LocalityModule {}
