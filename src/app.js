// Importaciones

import express from 'express';
import taskRouter from './routes/task.routes.js';
import userRouter from './routes/user.routes.js';

// Aplicación Express
const app = express();

// TODO: Eliminar está ruta
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Importar rutas
app.use('/taskapi/users/', userRouter);
app.use('/taskapi/tasks/', taskRouter);

export default app;
