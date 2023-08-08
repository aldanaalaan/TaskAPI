// * Cambiar contraseña de usuario
// Importaciones

import { Router } from 'express';

import validateToken from '../../middlewares/validateToken.js';
import { User } from '../../models/User.js';

const passwordRoute = Router();

passwordRoute.put('/password', validateToken, async (req, res) => {
  // Obtener datos
  const { password, newPassword } = req.body;
  const userID = req.decoded._id;

  // Obtener usuario
  const user = await User.findById(userID);

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }
  if (!user.validateCorrectPassword(password)) {
    res.status(401).json({
      success: false,
      message: 'La antigua contraseña no coincide',
    });
  }

  if (!newPassword) {
    res.status(400).json({
      success: false,
      message: 'Nueva contraseña no proporcionada',
    });
  }

  user.password = newPassword;

  try {
    await user.save();
    res.status(200).json({
      success: true,
      message: 'La contraseña fue cambiada correctamente',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
});

export default passwordRoute;
