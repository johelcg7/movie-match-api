const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`); // Registrar el error con más contexto

    const status = err.status || 500;
    const message = err.message || "Error interno del servidor.";

    res.status(status).json({
        error: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Mostrar stack solo en desarrollo
    });
};

export default errorHandler;

