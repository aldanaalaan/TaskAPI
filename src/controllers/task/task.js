// * Obtener una tarea especifica o todas las tareas de un usuario
// Importaciones
import { Router } from 'express';

import validateToken from '../../middlewares/validateToken.js';
import { Task } from '../../models/Task.js';

const taskRoutes = Router();

taskRoutes.get('/', validateToken, async (req, res) => {
  const tasks = await Task.find({ owner: req.decoded._id });

  if (tasks.length === 0) {
    res.status(404).json({
      success: false,
      message: 'No se encontraron tareas para este usuario',
    });
  }
  res.status(200).json({
    success: true,
    message: 'Tareas encontradas',
    tasks: tasks,
  });
});

taskRoutes.get('/:id', validateToken, async (req, res) => {
  const taskId = req.params.id;

  const task = await Task.findOne({ _id: taskId, owner: req.decoded._id });
  if (!task) {
    res.status(404).json({
      success: false,
      message: 'Tarea no encontrada',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Tarea encontrada',
    task: task,
  });
});

export default taskRoutes;
