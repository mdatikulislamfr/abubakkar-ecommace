// Import route definitions
import web from '../routes/web.route.js';
import api from '../routes/api.route.js';
import { Application } from 'express-application-framework';
// Import application configuration
import appConfig from '../config/app.js';
// Import CORS configuration
import corsConfig from '../config/cors.js';
import reqMiddleware from '../app/Http/Middleware/req.middleware.js';
const memory = process.memoryUsage();
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
const activaryUrl = new Map<string, { url: string, count: number }>();
export default Application({
    root: process.cwd(),
    config: {
        jsonLimit: appConfig.request.jsonLimit,
        urlencodedLimit: appConfig.request.urlencodedLimit
    },
    port: appConfig.server.port,
    cors: corsConfig,
    callback(app) {
        app.use("/", (req, _, next) => {
            const url = req.url;
            const existing = activaryUrl.get(url);
            if (existing) {
                existing.count++;
            } else {
                activaryUrl.set(url, { url, count: 1 })
            }
            console.log(activaryUrl);
            console.log(`Total RAM Used: ${(memory.rss / 1024 / 1024).toFixed(2)} MB`);
            next();
        })
        app.use(reqMiddleware);
        // Mount API routes under /api prefix
        app.use("/api", api);
        // Mount web routes at root path
        app.use("/", web);
        return app;
    },
})


