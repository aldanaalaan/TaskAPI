/*
 * Enrutador de tareas
 - GET: Obtener todas las tareas de un usuario
 - GET: Obtener una tarea especifica de un usuario
 - POST: Agregar una tarea de un usuario especifico
 - PUT: Actualizar el estado de una tarea
 - DELETE: Eliminar una tarea
 */

// Importaciones

import { Router, json, urlencoded } from 'express';

import completedRoute from '../controllers/task/completed.js';
import createRoute from '../controllers/task/create.js';
import taskRoutes from '../controllers/task/task.js';
import updateRoute from '../controllers/task/update.js';
import deleteRoute from '../controllers/user/delete.js';

const taskRouter = Router();

// Middlewares
taskRouter.use(json());
taskRouter.use(urlencoded({ extended: false }));

// Rutas
taskRouter.use('/', completedRoute);
taskRouter.use('/', createRoute);
taskRouter.use('/', deleteRoute);
taskRouter.use('/', taskRoutes);
taskRouter.use('/', updateRoute);

export default taskRouter;
