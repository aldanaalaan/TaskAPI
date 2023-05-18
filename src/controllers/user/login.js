// * Obtener token con un usuario ya creado
// Importaciones

import {
  emailExists,
  validateEmail,
  validatePassword,
} from "../../utils/validators.js";

import { Router } from "express";
import { User } from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";

const loginRoute = Router();

loginRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  // !V Falta de datos
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message:
        "Falta de datos: correo electrónico o contraseña no proporcionados",
    });
  }

  // !V Validación de datos
  if (!validateEmail(email)) {
    res.status(400).json({
      success: false,
      message: "El correo electrónico proporcionado no es valido",
    });
  }
  if (!validatePassword(password)) {
    res.status(400).json({
      success: false,
      message: "La contraseña proporcionada no es valida",
    });
  }

  // !V Correo registrado
  const emailExist = await emailExists(email);

  if (!emailExist) {
    res.status(401).json({
      success: false,
      message: "El correo electrónico proporcionado no está registrado",
    });
  }

  // !V Contraseña correcta
  const passwordIsValid = await user.validateCorrectPassword(password);

  if (!passwordIsValid) {
    res.status(401).json({
      success: false,
      message: "La contraseña proporcionada es incorrecta",
    });
  }

  // * Respuesta exitosa
  res.status(200).json({
    success: true,
    message: "Inicio de sesión exitoso",
    token: generateToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    }),
  });
});

export default loginRoute;
