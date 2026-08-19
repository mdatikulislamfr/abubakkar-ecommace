import type { Knex } from "knex";

import dbconfig from './dist/config/database.js';
/**
 * @type {import('knex').Knex.Config}
 */
const config: Knex.Config = {
  client: "mysql2",
  connection: dbconfig.connections.mysql,
  migrations: dbconfig.migrations,
};

export default config;