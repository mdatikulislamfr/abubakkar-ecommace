import { ProductDataClient } from "../../@types/client.js";
import { Product } from "../../@types/table.js";
import { baseModel } from "./model.js";
export declare class ProductModel extends baseModel {
    static tableName: string;
    static primaryKey: string;
    static joinProducts(): import("knex").Knex.QueryBuilder<any, {
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
    static cacheInitialize(): Promise<void>;
    static update(product: Product): Promise<any>;
    static clientresponce(products: Product[]): Promise<ProductDataClient[]>;
}
//# sourceMappingURL=products.model.d.ts.map