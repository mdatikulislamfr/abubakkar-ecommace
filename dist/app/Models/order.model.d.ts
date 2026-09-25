import { baseModel } from "./model.js";
export declare class OrderModel extends baseModel {
    static tableName: string;
    static primaryKey: string;
    static join(): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: string;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    } | {
        _base: any;
        _hasSelection: true;
        _keys: string;
        _aliases: {};
        _single: boolean;
        _intersectProps: {};
        _unionProps: unknown;
    }>;
    static groupOrders(rows: any[]): any[];
    static cacheInitialize(): Promise<void>;
}
//# sourceMappingURL=order.model.d.ts.map