/*const errorHandler = (error, request, response, next) => {
    response.status(500).json({ succes: 'NOK', message: 'Error interno del servidor'})
};

module.exports = errorHandler;*/

const errorHandler = (error, req, res, next) => {
  console.error("❌ ERROR DETECTADO:", error);

  res.status(500).json({
    success: false,
    message: error.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'development' ? error.stack : {}
  });
};

module.exports = errorHandler;