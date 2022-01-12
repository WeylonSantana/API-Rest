import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers();

  res.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const user = await userRepository.findUserById(req.params.id);

    res.status(StatusCodes.OK).send(user);
  } catch (error) {
    next(error);
  }
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;
  await userRepository.create(newUser);
  res.sendStatus(StatusCodes.CREATED);
});

usersRoute.put('/users/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const updatedUser = req.body;
  updatedUser.uuid = req.params.id;

  await userRepository.update(updatedUser);

  res.sendStatus(StatusCodes.OK);
});

usersRoute.delete('/users/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  await userRepository.delete(req.params.id);
  res.sendStatus(StatusCodes.OK);
});

export default usersRoute;
