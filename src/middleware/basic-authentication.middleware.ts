import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';

export default async function basicAuthenticationMiddleware(res: Response, req: Request, next: NextFunction) {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não fornecidas');
    }

    const [authenticationType, token] = authorizationHeader.split(' ');

    if (authenticationType !== 'Basic' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido');
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = tokenContent.split(':');

    if (username !== 'admin' || password !== 'admin') {
      throw new ForbiddenError('Credenciais não preenchidas corretamente');
    }

    const user = await userRepository.findUserByUsernameAndPassword(username, password);
    console.log(user);

    if (!user) {
      throw new ForbiddenError('Usuário ou senha inválidos');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
