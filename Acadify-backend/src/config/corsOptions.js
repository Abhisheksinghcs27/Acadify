// config/corsOptions.js
import config from './environment.js';

const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
];

function splitOrigins(value) {
    if (!value || typeof value !== 'string') return [];
    return value.split(',').map((o) => o.trim()).filter(Boolean);
}

const fromEnv = splitOrigins(process.env.ALLOWED_ORIGINS);
const corsOriginSingle = config.CORS_ORIGIN ? [config.CORS_ORIGIN] : [];
const allowedOrigins = [...new Set([...defaultOrigins, ...fromEnv, ...corsOriginSingle])];

export const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, Postman, same-host proxy)
        if (!origin) return callback(null, true);

        if (!allowedOrigins.includes(origin)) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-HTTP-Method-Override'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
};
