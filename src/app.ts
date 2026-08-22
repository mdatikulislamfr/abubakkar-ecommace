// Import route definitions
import web from '../routes/web.route.js';
import api from '../routes/api.route.js';
import { Application } from 'express-application-framework';
// Import application configuration
import appConfig from '../config/app.js';
// Import CORS configuration
import corsConfig from '../config/cors.js';
import reqMiddleware from '../app/Http/Middleware/req.middleware.js';
/**
 * Application Entry Point
 * 
 * Initializes the Express application with:
 * - Configuration from config/app.ts
 * - CORS settings from config/cors.ts
 * - Database configuration from config/database.ts
 * - Web and API route handlers
 * - Request size limits and port settings
 */
export default Application({
    root: process.cwd(),
    config: {
        jsonLimit: appConfig.request.jsonLimit,
        urlencodedLimit: appConfig.request.urlencodedLimit
    },
    port: appConfig.server.port,
    cors: corsConfig,
    callback(app) {
        app.use(reqMiddleware);
        // Mount API routes under /api prefix
        app.use("/api", api);
        // Mount web routes at root path
        app.use("/", web);
        return app;
    },
})


