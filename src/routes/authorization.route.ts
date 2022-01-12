import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middleware/basic-authentication.middleware';
import jwtAuthenticationMiddleware from '../middleware/jwt-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ForbiddenError('Usuário ou senha inválidos');
    }

    const payload = { username: user.username };
    const secretKey = 'my_secret_key';
    //expiration time in seconds
    const options = { subject: user?.uuid, expiresIn: 60 * 2 };

    const jwt = JWT.sign(payload, secretKey, options);

    res.status(StatusCodes.OK).json({ token: jwt });
  } catch (error) {
    next(error);
  }
});

authorizationRoute.post(
  '/token/validate',
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);

export default authorizationRoute;
