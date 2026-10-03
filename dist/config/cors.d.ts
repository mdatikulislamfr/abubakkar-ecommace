/**
 * Cross-Origin Resource Sharing (CORS) Configuration
 *
 * Configure allowed origins, methods, headers, and other CORS settings.
 * This controls which domains can access your API.
 */
declare const _default: {
    /**
     * Allowed Origins
     *
     * Domains that are allowed to make cross-origin requests.
     * Use '*' to allow all origins (not recommended for production)
     * Use an array of specific domains for production
     * Use a function for dynamic validation
     */
    origin: string[];
    /**
     * Allowed HTTP Methods
     *
     * Which HTTP methods are allowed for cross-origin requests
     */
    methods: string[];
    /**
     * Allowed Headers
     *
     * Which request headers are allowed in cross-origin requests
     */
    allowedHeaders: string[];
    /**
     * Exposed Headers
     *
     * Which response headers are exposed to the browser
     */
    exposedHeaders: string[];
    /**
     * Allow Credentials
     *
     * Whether credentials (cookies, authorization headers, etc.)
     * should be included in cross-origin requests
     */
    credentials: boolean;
    /**
     * Max Age
     *
     * How long (in seconds) the browser can cache preflight request results.
     * Set to 24 hours in production
     */
    maxAge: number;
    /**
     * Preflight Continue
     *
     * Whether to pass the CORS preflight response to the next handler
     */
    preflightContinue: boolean;
    /**
     * Success Status
     *
     * Status code to use for successful OPTIONS requests
     */
    optionsSuccessStatus: number;
    /**
     * Enable CORS
     *
     * Global flag to enable/disable CORS
     */
    enabled: boolean;
    /**
     * Dynamic Origin Validator Function
     *
     * This function can be used to validate origins dynamically.
     * Return true to allow, false to deny.
     */
    validator: (origin: string) => boolean;
    /**
     * Environment-Specific Settings
     */
    environments: {
        development: {
            origin: string;
            credentials: boolean;
            maxAge: number;
        };
        production: {
            origin: string[];
            credentials: boolean;
            maxAge: number;
        };
        testing: {
            origin: string;
            credentials: boolean;
            maxAge: number;
        };
    };
};
export default _default;
//# sourceMappingURL=cors.d.ts.map