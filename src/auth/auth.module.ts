import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
     {
      typegooseClass: AuthModule,
      schemaOptions: {
        collection: 'Auth'
      }
     }
    ])
  ]
})
export class AuthModule {}
