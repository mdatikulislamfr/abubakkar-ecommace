/**
 * Authentication Configuration
 *
 * This file contains authentication settings including:
 * - Default guard and provider
 * - JWT configuration
 * - Password hashing
 * - Token expiration times
 */
declare const _default: {
    /**
     * Default Authentication Guard
     *
     * Supported: "api", "web", "session"
     */
    default: string;
    /**
     * Default Authentication Provider
     *
     * Supported: "jwt", "session", "passport"
     */
    provider: string;
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
            driver: string;
            model: string;
            hash: string;
        };
        /**
         * Web Guard - Session-based authentication
         */
        web: {
            driver: string;
            model: string;
            hash: string;
        };
        /**
         * Admin Guard - Role-based access
         */
        admin: {
            driver: string;
            model: string;
            hash: string;
            roles: string[];
        };
    };
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
            driver: string;
            model: string;
            table: string;
        };
        /**
         * Admin Provider
         */
        admins: {
            driver: string;
            model: string;
            table: string;
        };
    };
    /**
     * Password Reset Configuration
     */
    passwords: {
        provider: string;
        table: string;
        expire: number;
        throttle: number;
    };
    /**
     * JWT Configuration
     */
    jwt: {
        secret: string;
        expiresIn: string;
        refreshExpiresIn: string;
        algorithm: string;
        type: string;
        issuer: string;
        audience: string;
    };
    /**
     * Session Configuration
     */
    session: {
        driver: string;
        timeout: number;
        cookieName: string;
        secure: boolean;
        httpOnly: boolean;
        sameSite: string;
    };
    /**
     * Password Hashing Configuration
     */
    hashing: {
        driver: string;
        bcrypt: {
            rounds: number;
        };
        argon2: {
            memory: number;
            time: number;
            parallelism: number;
        };
    };
    /**
     * Two-Factor Authentication
     */
    twoFactor: {
        enabled: boolean;
        provider: string;
        window: number;
        backupCodesCount: number;
    };
    /**
     * OAuth Configuration
     */
    oauth: {
        enabled: boolean;
        providers: {
            google: {
                clientId: string;
                clientSecret: string;
                redirectUri: string;
            };
            github: {
                clientId: string;
                clientSecret: string;
                redirectUri: string;
            };
        };
    };
    /**
     * Rate Limiting Configuration
     */
    rateLimiting: {
        enabled: boolean;
        maxLoginAttempts: number;
        lockoutDuration: number;
        resetAfter: number;
    };
};
export default _default;
//# sourceMappingURL=auth.d.ts.map