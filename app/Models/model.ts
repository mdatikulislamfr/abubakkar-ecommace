/**
 * Base Model Class
 * 
 * This is the base model class that all application models extend.
 * It provides ORM functionality from the express-mysql-framework.
 * 
 * @example
 * // Creating a User model
 * export class User extends Model {
 *     protected table = 'users';
 *     protected fillable = ['name', 'email', 'password'];
 *     protected hidden = ['password'];
 * }
 */

import { model } from "express-mysql-framework"

/**
 * Model Class
 * 
 * Extends the model from express-mysql-framework to provide:
 * - Database query building
 * - Record CRUD operations (Create, Read, Update, Delete)
 * - Relationship management
 * - Data validation
 * - Attribute casting
 * - Timestamps (created_at, updated_at)
 * 
 * @class Model
 * @extends model
 */
export class baseModel extends model {
    // Subclasses should define:
    // - protected table: string (database table name)
    // - protected fillable: string[] (mass assignable attributes)
    // - protected hidden: string[] (hidden from JSON output)
    // - protected casts: Record<string, string> (attribute type casting)
    // - protected timestamps: boolean (auto manage timestamps)
}
