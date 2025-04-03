export const errorHandler = (err, req, res, next) => {
    console.error(err.message); // Registrar el error en la consola

    const status = err.status || 500; // Usar el código de estado del error o 500 por defecto
    const message = err.message || "Error interno del servidor.";

    res.status(status).json({ error: message }); // Responder con un mensaje de error en formato JSON
};