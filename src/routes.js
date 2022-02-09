import { Router } from "express";

import UserController from "./controllers/UserController";

import RepositoriesController from "./controllers/RepositoryController";
 
import Auth from "./middlewares/auth";

import SessionsController from './controllers/SessionsController';

const routes = Router();

//Rotas da aplicação

//Rotas Públicas 

routes.post('/sessions', SessionsController.create);

//Middlewares

routes.use(Auth);

//Rotas Privadas

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/users/:user_id/repositories', RepositoriesController.index);
routes.post('/users/:user_id/repositories', RepositoriesController.create);
routes.delete('/users/:user_id/repositories/:id', RepositoriesController.destroy);

export default routes;