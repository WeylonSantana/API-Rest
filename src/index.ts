import Express, { Request, Response, NextFunction } from 'express';
import statusRouter from './routes/status.route';
import usersRouter from './routes/users.route';

const app = Express();
app.use(statusRouter);
app.use(usersRouter);
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
