import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const usersRouter = Router();

//Making a GET request to /users will return a list of users
usersRouter.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [{ name: 'John' }, { name: 'Sally' }];
  res.status(StatusCodes.OK).send(users);
});

//Making a GET request to /users/:uuid will return a user
usersRouter.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  res.status(StatusCodes.OK).send({ uuid });
});

//Making a POST request to /users will create a new user
usersRouter.post('/users', (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  res.status(StatusCodes.CREATED).send(user);
});

//Making a PUT request to /users/:uuid will update a user
usersRouter.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  const user = req.body;
  res.status(StatusCodes.OK).send({ uuid, user });
});

//Making a DELETE request to /users/:uuid will delete a user
usersRouter.delete('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.OK);
});

export default usersRouter;
