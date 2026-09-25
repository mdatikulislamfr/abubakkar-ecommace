/**
 * Database Configuration
 *
 * This file contains database connection settings for different environments.
 * Supports MySQL, PostgreSQL, SQLite, and other database systems.
 */
import 'dotenv/config.js';
declare const _default: {
    /**
     * Default Database Connection
     *
     * Supported: "mysql", "postgresql", "sqlite", "mssql"
     */
    default: string;
    /**
     * Database Connections
     */
    connections: {
        /**
         * MySQL Connection
         */
        mysql: {
            driver: string;
            host: string;
            port: number;
            database: string;
            user: string;
            password: string;
            charset: string;
            collation: string;
            timezone: string;
            connectionLimit: number;
            waitForConnections: boolean;
            queueLimit: number;
            debug: boolean;
            ssl: boolean | {
                rejectUnauthorized: boolean;
                ca: string | undefined;
                cert: string | undefined;
                key: string | undefined;
            };
        };
    };
    /**
     * Migrations Configuration
     */
    migrations: {
        directory: string;
        table: string;
        extension: string;
        sortDirsSeparately: boolean;
    };
    /**
     * Seeds Configuration
     */
    seeds: {
        directory: string;
        extension: string;
        sortDirsSeparately: boolean;
    };
    /**
     * Query Builder Configuration
     */
    query: {
        debug: boolean;
        slowQuery: number;
    };
    /**
     * Backup Configuration
     */
    backup: {
        enabled: boolean;
        schedule: string;
        directory: string;
        retention: number;
    };
    /**
     * Replication Configuration
     */
    replication: {
        enabled: boolean;
        read: {
            host: string;
            port: number;
        }[];
        write: {
            host: string;
            port: number;
        };
    };
    /**
     * Environment-Specific Configuration
     */
    environments: {
        development: {
            connection: string;
            debug: boolean;
        };
        production: {
            connection: string;
            debug: boolean;
            connectionLimit: number;
        };
        testing: {
            connection: string;
            debug: boolean;
        };
    };
    /**
     * Database Seeds to Run
     *
     * Seeds are run in the order specified
     */
    seeders: string[];
};
export default _default;
//# sourceMappingURL=database.d.ts.map