import express from 'express';
import errorHandler from './middleware/erro-handler.middleware';
import jwtAuthenticationMiddleware from './middleware/jwt-authentication.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurações das rotas
app.use(statusRoute);
app.use(authorizationRoute);
app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//Configurações dos erros handle
app.use(errorHandler);

//Inicialização do servidor
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
