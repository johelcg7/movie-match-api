export default (err, req, res, next) => {
    const status = err.status || 500; // Usar el código de estado del error o 500 por defecto
    res.status(status).json({
        error: {
            message: err.message || "Error interno del servidor",
            status: status,
        },
    });
};

