// * Marcar/Desmarcar tarea como completada
// Importaciones

import { Router } from "express";
import { Task } from "../../models/Task.js";
import errorHandler from "../../utils/errorHandler.js";
import validateToken from "../../middlewares/validateToken.js";

const completedRoute = Router();

completedRoute.put(":id/completed", validateToken, async (req, res) => {
  const taskId = req.params.id;
  const ownerId = req.decoded._id;

  const task = await Task.findByIdAndUpdate({
    _id: taskId,
    owner: ownerId,
  });

  // VALIDATION: Tarea existente
  if (!task) {
    res.status(404).json({
      success: false,
      message: "Tarea no encontrada",
    });
  }

  // Actualización de estado
  task.completed = task.completed ? false : true;

  // Guardar estado
  try {
    const updatedTask = await task.save();
    res.status(200).json({
      success: true,
      message: "Estado de la tarea actualizado con éxito",
      estate: updatedTask.completed,
    });
  } catch (err) {
    errorHandler(res);
  }
});

export default completedRoute;
