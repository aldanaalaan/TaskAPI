// * Manejar error del servidor (500)
const errorHandler = (res) => {
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
  });
};

export default errorHandler;
