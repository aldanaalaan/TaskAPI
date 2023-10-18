/*
 * Esquema de Usuario
- Nombre de usuario: String de corto con un nombre de usuario de 3 a 20 caracteres
- E-Mail: Correo electrónico del usuario, con el que se identificara para iniciar sesión, esté será único
- Contraseña: Contraseña del usuario que dará acceso al usuario de un correo especifico
 */

// Importaciones

import { Schema, model } from 'mongoose';
import { regexEmail, regexUsername } from '../utils/regex.js';

import bcryptjs from 'bcryptjs';

// Definición del esquema de usuarios
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    match: [regexUsername, 'El nombre de usuario no es válido'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [regexEmail, 'El correo electrónico no es válido'],
  },
  password: {
    type: String,
    required: true,
  },
});

// Métodos del usuario
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

userSchema.methods.validateCorrectPassword = function (password) {
  return bcryptjs.compare(password, this.password);
};

// Modelo de usuario
const User = model('User', userSchema);

// Exportar esquema y modelo
export { userSchema, User };
