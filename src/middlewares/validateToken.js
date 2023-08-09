// * Middleware para validar los JWT
// Importaciones

import { verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

import { User } from '../models/User.js';
import errorHandler from '../utils/errorHandler.js';

async function validateToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token de acceso requerido',
    });
  }

  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    req.decoded = decoded;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message:
          'Token de acceso expirado, inicie sesión nuevamente para obtener un token vigente',
      });
    } else if (err instanceof JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso invalido',
      });
    } else {
      return errorHandler(res);
    }
  }
  next();
}

export default validateToken;
