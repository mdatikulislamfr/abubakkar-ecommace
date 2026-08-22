/**
 * Application Configuration
 * 
 * This file contains all the core application configuration settings.
 * Environment-specific values should be stored in .env file.
 */

export default {
    /**
     * Application Name
     */
    name: process.env.APP_NAME || 'Express App',

    /**
     * Application Environment
     * 
     * Supported: "development", "production", "testing"
     */
    env: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV !=="development",

    /**
     * Server Configuration
     */
    server: {
        // Server port
        port: Number(process.env.PORT || 3000),

        // Server host
        host: process.env.HOST || 'localhost',

        // Debug mode
        debug: process.env.DEBUG === 'true',
    },

    /**
     * Request Configuration
     */
    request: {
        // Maximum JSON payload size
        jsonLimit: process.env.JSON_LIMIT || '1mb',

        // Maximum URL-encoded payload size
        urlencodedLimit: process.env.URLENCODED_LIMIT || '5mb',

        // Request timeout in milliseconds
        timeout: Number(process.env.REQUEST_TIMEOUT || 30000),
    },

    /**
     * CORS Configuration
     */
    cors: {
        // Allowed origins
        origin: process.env.CORS_ORIGIN || '*',

        // Allowed credentials
        credentials: process.env.CORS_CREDENTIALS === 'true',

        // Allowed methods
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

        // Allowed headers
        allowedHeaders: ['Content-Type', 'Authorization'],
    },

    /**
     * Session Configuration
     */
    session: {
        // Session secret
        secret: process.env.SESSION_SECRET || 'your-secret-key',

        // Session timeout in milliseconds (1 hour)
        timeout: Number(process.env.SESSION_TIMEOUT || 3600000),
    },

    /**
     * Cache Configuration
     */
    cache: {
        // Cache driver: "memory" or "redis"
        driver: process.env.CACHE_DRIVER || 'memory',

        // Cache default TTL in seconds
        ttl: Number(process.env.CACHE_TTL || 3600),
    },

    /**
     * Database Configuration
     */
    database: {
        // Database connection
        connection: process.env.DB_CONNECTION || 'mysql',

        // Host
        host: process.env.DB_HOST || 'localhost',

        // Port
        port: Number(process.env.DB_PORT || 3306),

        // Database name
        database: process.env.DB_DATABASE || 'express_app',

        // Username
        user: process.env.DB_USER || 'root',

        // Password
        password: process.env.DB_PASSWORD || '',
    },

    /**
     * Authentication Configuration
     */
    auth: {
        // Default authentication guard
        guard: process.env.AUTH_GUARD || 'api',

        // JWT secret
        secret: process.env.JWT_SECRET || 'your-jwt-secret',

        // JWT expiration
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },

    /**
     * Logging Configuration
     */
    logging: {
        // Log level: "error", "warn", "info", "debug"
        level: process.env.LOG_LEVEL || 'info',

        // Log file path
        path: process.env.LOG_PATH || 'storage/logs',
    },

    /**
     * File Upload Configuration
     */
    upload: {
        // Upload directory
        directory: process.env.UPLOAD_DIR || 'storage/uploads',

        // Maximum file size (in bytes)
        maxSize: Number(process.env.UPLOAD_MAX_SIZE || 5242880), // 5MB

        // Allowed file types
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    },
    sms: {
        url: '',
        key: "",
        id: "",
        sender_id:""
    },
    mail: {
        
    }
};