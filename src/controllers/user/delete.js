// * Eliminar un usuario especifico
// Importaciones

import { Router } from 'express';

import validateToken from '../../middlewares/validateToken.js';
import { Task } from '../../models/Task.js';
import { User } from '../../models/User.js';

const deleteRoute = Router();

deleteRoute.delete('/', validateToken, async (req, res) => {
  const userID = req.decoded._id;

  // Eliminar usuario
  const deleted = await User.findByIdAndDelete(userID);

  // TODO: Corregir, las tareas no se eliminan al eliminar el usuario.
  const deletedTasks = await Task.deleteMany({ owner: userID, tasks: deleted });

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  if (!deletedTasks) {
    res.sensStatus(400);
  }

  res.status(204).json({
    success: true,
    message: 'Usuario eliminado correctamente',
  });
});

export default deleteRoute;
