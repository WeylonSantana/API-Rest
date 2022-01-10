import Express, { Request, Response, NextFunction } from 'express';
import bearerAuthenticationMiddleware from './middleware/jwt-authentication.middleware';
import errorHandler from './middleware/erro-handler.middleware';
import authorizationRouter from './routes/authorization.route';
import statusRouter from './routes/status.route';
import usersRouter from './routes/users.route';
import jwtAuthenticationMiddleware from './middleware/jwt-authentication.middleware';

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(statusRouter);
app.use(authorizationRouter);
app.use(jwtAuthenticationMiddleware);
app.use(usersRouter);

app.use(errorHandler);

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
