/**
 * Application Configuration
 *
 * This file contains all the core application configuration settings.
 * Environment-specific values should be stored in .env file.
 */
declare const _default: {
    /**
     * Application Name
     */
    name: string;
    /**
     * Application Environment
     *
     * Supported: "development", "production", "testing"
     */
    env: string;
    isProduction: boolean;
    /**
     * Server Configuration
     */
    server: {
        port: number;
        host: string;
        debug: boolean;
    };
    /**
     * Request Configuration
     */
    request: {
        jsonLimit: string;
        urlencodedLimit: string;
        timeout: number;
    };
    /**
     * CORS Configuration
     */
    cors: {
        origin: string;
        credentials: boolean;
        methods: string[];
        allowedHeaders: string[];
    };
    /**
     * Session Configuration
     */
    session: {
        secret: string;
        timeout: number;
    };
    /**
     * Cache Configuration
     */
    cache: {
        driver: string;
        ttl: number;
    };
    /**
     * Database Configuration
     */
    database: {
        connection: string;
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
    /**
     * Authentication Configuration
     */
    auth: {
        guard: string;
        secret: string;
        expiresIn: string;
    };
    /**
     * Logging Configuration
     */
    logging: {
        level: string;
        path: string;
    };
    /**
     * File Upload Configuration
     */
    upload: {
        directory: string;
        maxSize: number;
        allowedTypes: string[];
    };
    sms: {
        url: string;
        key: string;
        id: string;
        sender_id: string;
    };
    mail: {};
};
export default _default;
//# sourceMappingURL=app.d.ts.map