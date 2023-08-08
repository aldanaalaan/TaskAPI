// * Crear una nueva tarea
// Importaciones

import { Router } from 'express';

import validateToken from '../../middlewares/validateToken.js';
import { Task } from '../../models/Task.js';
import errorHandler from '../../utils/errorHandler.js';
import { validateDescription, validateTitle } from '../../utils/validators.js';

const createRoute = Router();

createRoute.post('/', validateToken, async (req, res) => {
  const { title, description } = req.body;
  const owner = req.decoded._id;

  // Validaciones de campos
  // VALIDATION: Titulo
  if (!title) {
    res.status(400).json({
      success: false,
      message: 'Título no proporcionado',
    });
  }

  if (!validateTitle(title)) {
    res.status(400).json({
      success: false,
      message: 'El título no es valido',
    });
  }

  // Crear objeto del documento
  const newTaskData = {
    title: title,
    owner: owner,
  };

  // VALIDATION: Descripción (Opcional)
  if (description) {
    if (!validateDescription(description)) {
      res.status(400).json({
        success: false,
        message: 'La descripción no es valida',
      });
    } else {
      newTaskData.description = description;
    }
  }

  try {
    const task = new Task(newTaskData);
    const newTask = await task.save();
    res.status(201).json({
      success: true,
      message: 'La tarea fue creada con éxito',
      task: newTask,
    });
  } catch (err) {
    errorHandler(res);
  }
});

export default createRoute;
