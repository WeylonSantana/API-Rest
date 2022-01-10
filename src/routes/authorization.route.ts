import { NextFunction, request, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middleware/basic-authentication.middleware';
import jwtAuthenticationMiddleware from '../middleware/jwt-authentication.middleware';

const authorizationRouter = Router();

authorizationRouter.post(
  '/token',
  basicAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ForbiddenError('Usuário ou senha inválidos');
      }

      const jwtPayload = { username: user.username };
      const jwtSecret = process.env.JWT_SECRET || 'secret';
      const jwtOptions = { subject: user?.uuid };

      const jwt = JWT.sign(jwtPayload, jwtSecret, jwtOptions);
      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

authorizationRouter.post(
  '/token/validate',
  jwtAuthenticationMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);

export default authorizationRouter;
