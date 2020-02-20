import { Router } from 'express';
import multer from 'multer';

import AvatarController from './app/controllers/AvatarController';
import DelivererController from './app/controllers/DelivererController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/users', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/avatars', upload.single('file'), AvatarController.store);

routes.get('/deliveres', DelivererController.index);
routes.post('/deliveres', DelivererController.store);
routes.put('/deliveres/:id', DelivererController.update);
routes.delete('/deliveres/:id', DelivererController.delete);

export default routes;
