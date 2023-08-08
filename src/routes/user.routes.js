// Importaciones

import { Router, json, urlencoded } from 'express';

import deleteRoute from '../controllers/user/delete.js';
import loginRoute from '../controllers/user/login.js';
import meRoute from '../controllers/user/me.js';
import passwordRoute from '../controllers/user/password.js';
import signupRoute from '../controllers/user/signup.js';
import updateRoute from '../controllers/user/update.js';

const userRouter = Router();

// Middlewares
userRouter.use(json());
userRouter.use(urlencoded({ extended: false }));

// Rutas
userRouter.use('/login', loginRoute);
userRouter.use('/me', deleteRoute);
userRouter.use('/me', meRoute);
userRouter.use('/me', passwordRoute);
userRouter.use('/me', updateRoute);
userRouter.use('/signup', signupRoute);

export default userRouter;
