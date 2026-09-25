/**
 * Authentication Configuration
 *
 * This file contains authentication settings including:
 * - Default guard and provider
 * - JWT configuration
 * - Password hashing
 * - Token expiration times
 */
export default {
    /**
     * Default Authentication Guard
     *
     * Supported: "api", "web", "session"
     */
    default: process.env.AUTH_GUARD || 'api',
    /**
     * Default Authentication Provider
     *
     * Supported: "jwt", "session", "passport"
     */
    provider: process.env.AUTH_PROVIDER || 'jwt',
    /**
     * Guards Configuration
     *
     * Defines how different parts of the application authenticate users
     */
    guards: {
        /**
         * API Guard - Token-based authentication
         */
        api: {
            driver: 'jwt',
            model: 'App\\Models\\User',
            hash: 'bcrypt',
        },
        /**
         * Web Guard - Session-based authentication
         */
        web: {
            driver: 'session',
            model: 'App\\Models\\User',
            hash: 'bcrypt',
        },
        /**
         * Admin Guard - Role-based access
         */
        admin: {
            driver: 'jwt',
            model: 'App\\Models\\Admin',
            hash: 'bcrypt',
            roles: ['admin', 'superadmin'],
        },
    },
    /**
     * Providers Configuration
     *
     * Defines authentication providers and their models
     */
    providers: {
        /**
         * User Provider
         */
        users: {
            driver: 'database',
            model: 'App\\Models\\User',
            table: 'users',
        },
        /**
         * Admin Provider
         */
        admins: {
            driver: 'database',
            model: 'App\\Models\\Admin',
            table: 'admins',
        },
    },
    /**
     * Password Reset Configuration
     */
    passwords: {
        provider: 'users',
        table: 'password_resets',
        expire: Number(process.env.PASSWORD_RESET_EXPIRE || 3600), // 1 hour
        throttle: 60, // seconds
    },
    /**
     * JWT Configuration
     */
    jwt: {
        // JWT secret key for signing tokens
        secret: process.env.JWT_SECRET || 'your-jwt-secret-key',
        // Token expiration time
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        // Refresh token expiration
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        // Algorithm for token signing
        algorithm: 'HS256',
        // Token type
        type: 'Bearer',
        // Issuer
        issuer: process.env.APP_NAME || 'Express App',
        // Audience
        audience: process.env.JWT_AUDIENCE || 'api',
    },
    /**
     * Session Configuration
     */
    session: {
        // Session driver
        driver: 'cookie',
        // Session timeout (in milliseconds)
        timeout: Number(process.env.SESSION_TIMEOUT || 3600000), // 1 hour
        // Session cookie name
        cookieName: 'XSRF-TOKEN',
        // Secure cookie flag
        secure: process.env.NODE_ENV === 'production',
        // HTTP only flag
        httpOnly: true,
        // Same site flag
        sameSite: 'lax',
    },
    /**
     * Password Hashing Configuration
     */
    hashing: {
        // Hash driver: "bcrypt" or "argon2"
        driver: process.env.HASH_DRIVER || 'bcrypt',
        // Bcrypt rounds
        bcrypt: {
            rounds: Number(process.env.BCRYPT_ROUNDS || 10),
        },
        // Argon2 options
        argon2: {
            memory: 65536,
            time: 4,
            parallelism: 1,
        },
    },
    /**
     * Two-Factor Authentication
     */
    twoFactor: {
        // Enable 2FA
        enabled: process.env.TWO_FACTOR_ENABLED === 'true',
        // 2FA provider: "authy" or "google"
        provider: process.env.TWO_FACTOR_PROVIDER || 'google',
        // 2FA code window (in 30-second intervals)
        window: 1,
        // 2FA backup codes count
        backupCodesCount: 10,
    },
    /**
     * OAuth Configuration
     */
    oauth: {
        // Enable OAuth
        enabled: process.env.OAUTH_ENABLED === 'true',
        // OAuth providers
        providers: {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
                redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback',
            },
            github: {
                clientId: process.env.GITHUB_CLIENT_ID || '',
                clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
                redirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/github/callback',
            },
        },
    },
    /**
     * Rate Limiting Configuration
     */
    rateLimiting: {
        // Enable rate limiting
        enabled: true,
        // Max login attempts
        maxLoginAttempts: 5,
        // Lockout duration (in minutes)
        lockoutDuration: 15,
        // Reset attempts after (in minutes)
        resetAfter: 60,
    },
};
//# sourceMappingURL=auth.js.map