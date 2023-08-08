// * Middleware para validar los JWT
// Importaciones

import jwt from 'jsonwebtoken';

import { User } from '../models/User.js';

async function validateToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token de acceso requerido',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    req.decoded = decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message:
          'Token de acceso expirado, inicie sesión nuevamente para obtener un token vigente',
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso invalido',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
      });
    }
  }
  next();
}

export default validateToken;
