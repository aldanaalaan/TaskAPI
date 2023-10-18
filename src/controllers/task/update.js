// * Actualizar el titulo y/o descripción de una tarea
// Importaciones

import { validateDescription, validateTitle } from '../../utils/validators.js';

import { Router } from 'express';
import { Task } from '../../models/Task.js';
import errorHandler from '../../utils/errorHandler.js';
import validateToken from '../../middlewares/validateToken.js';

const updateRoute = Router();

updateRoute.put(':id', validateToken, async (req, res) => {
  // Obtener datos
  const { title, description } = req.body;
  const taskId = req.params.id;

  const task = await Task.findOne({ _id: taskId, owner: req.decoded._id });

  // VALIDATION: Tarea existente
  if (!task) {
    res.status(404).json({
      success: false,
      message: 'Tarea no encontrada',
    });
  }

  // VALIDATION: Dato(s) a actualizar
  if (!title && !description) {
    res.status(400).json({
      success: false,
      message: 'Ningún dato proporcionado para actualizar',
    });
  }

  // VALIDATION: Datos validos
  if (!validateTitle(title) || validateDescription(description)) {
    res.status(400).json({
      success: false,
      message: 'Uno o más datos ingresados son inválidos',
    });
  }

  // * Actualización de datos
  if (title) {
    task.title = title;
  }
  if (description) {
    task.description = description;
  }

  // Guardar cambios
  try {
    const updatedTask = await task.save();
    res.status(200).json({
      success: true,
      message: 'Dato de la tarea actualizados correctamente',
      // OPTIMIZE: Encontrar una forma de retornar el task sin repetición de código
      task: description
        ? {
          _id: updatedTask._id,
          title: updatedTask.title,
          description: updatedTask.description,
        }
        : {
          _id: updatedTask._id,
          title: updatedTask.title,
        },
    });
  } catch (err) {
    errorHandler(res);
  }
});

export default updateRoute;
