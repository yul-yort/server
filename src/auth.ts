import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // Если отсутствует токен в заголовке, верните ошибку
      return res.status(401).json({ message: 'Токен отсутствует' });
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
        return res.status(401).json({ message: 'Недействительный токен' });
      });
  }
}
