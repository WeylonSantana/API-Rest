import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.errors.model';
import userRepository from '../repositories/user.repository';

const usersRouter = Router();

//Making a GET request to /users will return a list of users
usersRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers();
  res.status(StatusCodes.OK).send(users);
});

//Making a GET request to /users/:uuid will return a user
usersRouter.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
    const user = await userRepository.findUserByUuid(uuid);
    res.status(StatusCodes.OK).send(user);
  } catch (error) {
    next(error);
  }
});

//Making a POST request to /users will create a new user
usersRouter.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;
  const uuid = await userRepository.create(newUser);
  res.status(StatusCodes.CREATED).send(uuid);
});

//Making a PUT request to /users/:uuid will update a user
usersRouter.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  const modifiedUser = req.body;
  modifiedUser.uuid = uuid;

  await userRepository.update(modifiedUser);
  res.status(StatusCodes.OK).send();
});

//Making a DELETE request to /users/:uuid will delete a user
usersRouter.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  await userRepository.deleteUser(uuid);
  res.sendStatus(StatusCodes.OK);
});

export default usersRouter;
