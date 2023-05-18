// * Funciones de validación
// Importaciones

import {
  regexEmail,
  regexPassword,
  regexText,
  regexUsername,
} from "./regex.js";

import { User } from "../models/User.js";

// VALIDATION: RegEx

// Usuarios
const validateUsername = (username) => {
  return regexUsername.test(username);
};

const validatePassword = (password) => {
  return regexPassword.test(password);
};

const validateEmail = (email) => {
  return regexEmail.test(email);
};

// Tareas
const validateTitle = (title) => {
  return regexText.test(title) && title.length > 3 && title.length <= 50;
};

const validateDescription = (description) => {
  return (
    regexText.test(description) &&
    description.length > 3 &&
    description.length <= 200
  );
};

// VALIDATION: Correo existente
const emailExists = async (email) => {
  let exists = await User.exists({ email: email });
  return exists;
};

export {
  validateUsername,
  validateEmail,
  validatePassword,
  validateTitle,
  validateDescription,
  emailExists,
};
