import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { isDev } from '../constants';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: isDev ? 'default_db' : 'default_db', //Переключить
      autoLoadEntities: true,
      synchronize: true, //В production нужно использовать использовать миграцию
      // synchronize: isDev,
    }),
  ],
})
export class TypeOrmModule {}
