/**
 * Cross-Origin Resource Sharing (CORS) Configuration
 *
 * Configure allowed origins, methods, headers, and other CORS settings.
 * This controls which domains can access your API.
 */
// Parse allowed origins from environment or use defaults
const getAllowedOrigins = () => {
    const corsOrigin = process.env.CORS_ORIGIN || '*';
    if (corsOrigin === '*') {
        return ['*'];
    }
    // If multiple origins are provided (comma-separated), split them
    return corsOrigin.split(',').map(origin => origin.trim());
};
export default {
    /**
     * Allowed Origins
     *
     * Domains that are allowed to make cross-origin requests.
     * Use '*' to allow all origins (not recommended for production)
     * Use an array of specific domains for production
     * Use a function for dynamic validation
     */
    origin: process.env.NODE_ENV === 'production'
        ? getAllowedOrigins()
        : [
            'http://localhost:3000/',
            'http://localhost:3001',
            'http://localhost:5173', // Vite
            'http://localhost:5174',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:5500',
            '*' // Allow all in development
        ],
    /**
     * Allowed HTTP Methods
     *
     * Which HTTP methods are allowed for cross-origin requests
     */
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    /**
     * Allowed Headers
     *
     * Which request headers are allowed in cross-origin requests
     */
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Accept-Language',
        'Origin',
        'Cache-Control',
        'X-API-KEY',
        'X-Token',
    ],
    /**
     * Exposed Headers
     *
     * Which response headers are exposed to the browser
     */
    exposedHeaders: [
        'Content-Length',
        'Content-Type',
        'X-Request-ID',
        'X-Response-Time',
        'X-Total-Count',
        'X-Page-Count',
        'Authorization',
    ],
    /**
     * Allow Credentials
     *
     * Whether credentials (cookies, authorization headers, etc.)
     * should be included in cross-origin requests
     */
    credentials: process.env.CORS_CREDENTIALS === 'true' ? true : false,
    /**
     * Max Age
     *
     * How long (in seconds) the browser can cache preflight request results.
     * Set to 24 hours in production
     */
    maxAge: process.env.NODE_ENV === 'production'
        ? 24 * 60 * 60 // 24 hours
        : 60 * 60, // 1 hour
    /**
     * Preflight Continue
     *
     * Whether to pass the CORS preflight response to the next handler
     */
    preflightContinue: false,
    /**
     * Success Status
     *
     * Status code to use for successful OPTIONS requests
     */
    optionsSuccessStatus: 200,
    /**
     * Enable CORS
     *
     * Global flag to enable/disable CORS
     */
    enabled: process.env.CORS_ENABLED !== 'false',
    /**
     * Dynamic Origin Validator Function
     *
     * This function can be used to validate origins dynamically.
     * Return true to allow, false to deny.
     */
    validator: (origin) => {
        const allowedOrigins = getAllowedOrigins();
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return true;
        // Allow if in allowed origins list
        if (allowedOrigins.includes('*'))
            return true;
        return allowedOrigins.includes(origin);
    },
    /**
     * Environment-Specific Settings
     */
    environments: {
        development: {
            origin: '*',
            credentials: true,
            maxAge: 3600,
        },
        production: {
            origin: getAllowedOrigins(),
            credentials: process.env.CORS_CREDENTIALS === 'true',
            maxAge: 86400,
        },
        testing: {
            origin: '*',
            credentials: false,
            maxAge: 0,
        },
    },
};
//# sourceMappingURL=cors.js.map