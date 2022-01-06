import Express, { Request, Response, NextFunction } from 'express';

const app = Express();

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
