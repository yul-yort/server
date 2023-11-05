import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // Если отсутствует токен в заголовке, верните ошибку
      return new UnauthorizedException('Токен отсутствует');
    }

    const [, token] = authHeader.split(' ');
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req['user'] = decodedToken; // Помещаем информацию о пользователе в объект запроса
        next();
      })
      .catch((error) => {
        console.log('error', error);
        return new UnauthorizedException(error, 'Недействительный токен');
      });
  }
}
