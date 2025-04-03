
// Define una función llamada `logger` que actúa como middleware en una aplicación Express.
// Recibe tres parámetros: `req` (la solicitud HTTP), `res` (la respuesta HTTP) y `next` (una función para pasar al siguiente middleware).
export const logger = (req, res, next) => {

    // Crea una marca de tiempo en formato ISO (por ejemplo, "2023-03-15T12:34:56.789Z").
    const timestamp = new Date().toISOString();

    // Imprime en la consola un mensaje que incluye la marca de tiempo, el método HTTP (GET, POST, etc.) y la URL solicitada.
    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    // Llama a la función `next` para continuar con el siguiente middleware o manejador de rutas.
    next();
}
