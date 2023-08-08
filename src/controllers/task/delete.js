// * Eliminar una tarea especifica
// Importaciones
import { Router } from 'express';

import validateToken from '../../middlewares/validateToken.js';
import { Task } from '../../models/Task.js';
import errorHandler from '../../utils/errorHandler.js';

const deleteRoute = Router();

deleteRoute.delete('/:id', validateToken, async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findOneAndRemove({ _id: taskId });

    if (!deletedTask) {
      res.status(404).json({
        success: false,
        message: 'Tarea no encontrada',
      });
    }

    res.status(204).json({
      success: true,
      message: 'Tarea eliminada correctamente',
    });
  } catch (err) {
    errorHandler(res);
  }
});
