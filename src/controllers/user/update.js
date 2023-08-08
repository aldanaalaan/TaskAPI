// * Actualizar nombre de usuario y/o correo electrónico
// Importaciones

import { Router } from 'express';

import validateToken from '../../middlewares/validateToken.js';
import { User } from '../../models/User.js';
import { validateEmail, validateUsername } from '../../utils/validators.js';

const updateRoute = Router();

updateRoute.put('/', validateToken, async (req, res) => {
  // Obtener los datos
  const { username, email } = req.body;
  const userID = req.decoded._id;

  // Obtener el usuario
  const user = await User.findById(userID);

  // VALIDACIÓN: Usuario existente
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    });
  }

  // VALIDACIÓN: Dato(s) para actualizar
  if (!username && !email) {
    res.status(400).json({
      success: false,
      message: 'Ningún dato proporcionado para actualizar',
    });
  }

  // VALIDACIÓN: Datos validos
  if (!validateUsername(username) || !validateEmail(email)) {
    res.status(400).json({
      success: false,
      message: 'Uno o más datos ingresados son inválidos',
    });
  }

  // * Actualización de datos
  if (username) {
    user.username = username;
  }
  if (email) {
    user.email = email;
  }

  // Guardar cambios
  try {
    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      message: 'Datos del usuario actualizados correctamente',
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
});

export default updateRoute;
