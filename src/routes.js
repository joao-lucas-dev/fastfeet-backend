import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

const routes = Router();

routes.post('/users', SessionController.store);

export default routes;
