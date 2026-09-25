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
import { model } from "express-mysql-framework";
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
export declare class baseModel extends model {
    static find(id: number): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: undefined;
    } | {
        _base: unknown;
        _hasSelection: boolean;
        _keys: string;
        _aliases: {};
        _single: boolean;
        _intersectProps: {};
        _unionProps: unknown;
    }>;
    static cacheInitialize(): void;
}
//# sourceMappingURL=model.d.ts.map