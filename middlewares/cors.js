import cors from "cors";

export const corsMiddleware = cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*", // Permitir múltiples dominios desde variables de entorno
    methods: ["GET", "POST", "PUT", "DELETE"],
});