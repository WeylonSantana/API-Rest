import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import ForbiddenError from '../models/errors/forbidden.error.model';

export default async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenError('Está faltando o Authorization header');
    }

    const [authenticationType, token] = authorizationHeader.split(' ');

    if (authenticationType !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido');
    }

    try {
      const tokenPayload = JWT.verify(token, 'my_secret_key');

      if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        throw new ForbiddenError('Token ou Subject inválido');
      }

      const user = { uuid: tokenPayload.sub, username: tokenPayload.username };
      req.user = user;

      next();
    } catch (error) {
      throw new ForbiddenError('Token inválido');
    }
  } catch (error) {
    next(error);
  }
}
