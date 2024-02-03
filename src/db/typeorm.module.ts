import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { isDev } from '../constants';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'mysql',
      host: '90.156.231.155',
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: '%e8Ihx&TM<rD#-',
      database: isDev ? 'default_db' : 'default_db', //Переключить
      autoLoadEntities: true,
      synchronize: true, //В production нужно использовать использовать миграцию
      // synchronize: isDev,
    }),
  ],
})
export class TypeOrmModule {}
