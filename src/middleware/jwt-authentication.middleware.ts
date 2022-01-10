import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT from 'jsonwebtoken';
import userRepository from '../repositories/user.repository';

export default async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não fornecidas');
    }

    const [authenticationType, token] = authorizationHeader.split(' ');

    if (authenticationType !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido');
    }

    try {
      const tokenPayload = JWT.verify(token, process.env.JWT_SECRET || 'secret');

      if (typeof tokenPayload !== 'object' && !tokenPayload.sub) {
        throw new ForbiddenError('Token inválido');
      }

      const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username,
      };
      req.user = user;

      next();
    } catch (error) {
      throw new ForbiddenError('Token inválido');
    }
  } catch (error) {
    next(error);
  }
}