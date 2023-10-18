// * Registro de un nuevo usuario
// Importaciones

import {
  emailExists,
  validateEmail,
  validatePassword,
  validateUsername,
} from '../../utils/validators.js';

import { Router } from 'express';
import { User } from '../../models/User.js';
import errorHandler from '../../utils/errorHandler.js';
import generateToken from '../../utils/generateToken.js';

const signupRoute = Router();

signupRoute.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  // !V Falta de datos
  if (!username) {
    res.status(400).json({
      success: false,
      message: 'Nombre de usuario no proporcionado',
    });
  }
  if (!email) {
    res.status(400).json({
      success: false,
      message: 'Correo electrónico no proporcionado',
    });
  }
  if (!password) {
    res.status(400).json({
      success: false,
      message: 'Nombre de usuario no proporcionado',
    });
  }

  // !V Validación de datos
  if (!validateUsername) {
    res.status(400).json({
      success: false,
      message: 'El nombre de usuario proporcionado no es valido',
    });
  }
  if (!validateEmail) {
    res.status(400).json({
      success: false,
      message: 'El correo electrónico proporcionado no es valido',
    });
  }
  if (!validatePassword) {
    res.status(400).json({
      success: false,
      message: 'La contraseña proporcionada no es valida',
    });
  }

  // !V Correo en uso
  let emailExist = await emailExists(email);

  if (emailExist) {
    res.status(409).json({
      success: false,
      message:
        'El correo electrónico proporcionado ya está vinculado a un usuario',
    });
  }

  // * Respuesta exitosa
  const newUser = new User({
    username: username,
    email: email,
    password: password,
  });

  newUser.password = await newUser.encryptPassword(password);

  try {
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      token: generateToken({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }),
    });
  } catch (err) {
    errorHandler(res);
  }
});

export default signupRoute;
