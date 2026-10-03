/**
 * Database Configuration
 *
 * This file contains database connection settings for different environments.
 * Supports MySQL, PostgreSQL, SQLite, and other database systems.
 */
import 'dotenv/config.js';
export default {
    /**
     * Default Database Connection
     *
     * Supported: "mysql", "postgresql", "sqlite", "mssql"
     */
    default: process.env.DB_CONNECTION || 'mysql',
    /**
     * Database Connections
     */
    connections: {
        /**
         * MySQL Connection
         */
        mysql: {
            driver: 'mysql2',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT || 3306),
            database: process.env.DB_NAME || 'express_app',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            charset: 'utf8mb4',
            collation: 'utf8mb4_unicode_ci',
            timezone: process.env.DB_TIMEZONE || 'UTC',
            // Connection pool settings
            connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
            waitForConnections: true,
            queueLimit: 0,
            // Enable query logging
            debug: process.env.DB_DEBUG === 'true',
            // SSL configuration for MySQL
            ssl: process.env.DB_SSL === 'true'
                ? {
                    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
                    ca: process.env.DB_SSL_CA,
                    cert: process.env.DB_SSL_CERT,
                    key: process.env.DB_SSL_KEY,
                }
                : false,
        },
    },
    /**
     * Migrations Configuration
     */
    migrations: {
        // Migrations directory
        directory: './database/migrations',
        // Table name for tracking migrations
        table: 'migrations',
        // Extension for migration files
        extension: 'ts',
        // Load migrations in sorted order
        sortDirsSeparately: true,
    },
    /**
     * Seeds Configuration
     */
    seeds: {
        // Seeds directory
        directory: process.env.DB_SEEDS_DIR || 'database/seeders',
        // Extension for seed files
        extension: 'ts',
        // Load seeds in sorted order
        sortDirsSeparately: true,
    },
    /**
     * Query Builder Configuration
     */
    query: {
        // Enable query logging
        debug: process.env.DB_DEBUG === 'true',
        // Log slow queries (in milliseconds)
        slowQuery: Number(process.env.DB_SLOW_QUERY_LOG || 1000),
    },
    /**
     * Backup Configuration
     */
    backup: {
        // Enable automatic backups
        enabled: process.env.DB_BACKUP_ENABLED === 'true',
        // Backup schedule (cron format)
        schedule: process.env.DB_BACKUP_SCHEDULE || '0 2 * * *', // Daily at 2 AM
        // Backup directory
        directory: process.env.DB_BACKUP_DIR || 'storage/backups',
        // Keep backups for (in days)
        retention: Number(process.env.DB_BACKUP_RETENTION || 30),
    },
    /**
     * Replication Configuration
     */
    replication: {
        // Enable replication
        enabled: process.env.DB_REPLICATION_ENABLED === 'true',
        // Read replicas (slave databases)
        read: [
            {
                host: process.env.DB_READ_HOST || process.env.DB_HOST || 'localhost',
                port: Number(process.env.DB_READ_PORT || process.env.DB_PORT || 3306),
            },
        ],
        // Write primary (master database)
        write: {
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT || 3306),
        },
    },
    /**
     * Environment-Specific Configuration
     */
    environments: {
        development: {
            connection: 'mysql',
            debug: true,
        },
        production: {
            connection: 'mysql',
            debug: false,
            // Use connection pooling in production
            connectionLimit: 20,
        },
        testing: {
            connection: 'sqlite',
            debug: false,
        },
    },
    /**
     * Database Seeds to Run
     *
     * Seeds are run in the order specified
     */
    seeders: [
        'UserSeeder',
        'RoleSeeder',
        'PermissionSeeder',
    ],
};
//# sourceMappingURL=database.js.map