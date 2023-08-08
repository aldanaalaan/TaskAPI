// Importaciones
import jsonwebtoken from 'jsonwebtoken';

export default function generateToken(payload) {
  const tokenData = {
    _id: payload._id,
    username: payload.username,
    email: payload.email,
  };

  return jsonwebtoken.sign(tokenData, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
}
