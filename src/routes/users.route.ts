import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const usersRouter = Router();

usersRouter.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [{ name: 'John' }, { name: 'Sally' }];
  res.status(StatusCodes.OK).send(users);
});

usersRouter.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  res.status(StatusCodes.OK).send({ uuid });
});

export default usersRouter;
