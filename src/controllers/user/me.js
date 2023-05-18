// * Obtener información del usuario
// Importaciones

import { Router } from "express";
import { User } from "../../models/User.js";
import validateToken from "../../middlewares/validateToken.js";

const meRoute = Router();

meRoute.get("/", validateToken, async (req, res) => {
  const user = await User.findById(req.decoded._id, { password: 0, __v: 0 });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "Usuario no encontrado",
    });
  }

  res.status(200).json({
    success: true,
    message: "Usuario encontrado",
    user: user,
  });
});

export default meRoute;
