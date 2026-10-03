import { ProductVariant } from "../../../@types/table.js";
type Operator = "=" | "!=" | ">" | ">=" | "<" | "<=" | "like";
export declare const getVarientsBy: (field: keyof ProductVariant, operator: Operator, value: string | number | boolean | null) => Promise<ProductVariant[]>;
export declare const createVarient: (data: ProductVariant[]) => import("knex").Knex.QueryBuilder<any, number[]>;
export declare const updateVarient: (id: number, data: Partial<ProductVariant>) => import("knex").Knex.QueryBuilder<any, number>;
export declare const deleteVarient: (id: number) => import("knex").Knex.QueryBuilder<any, number>;
export {};
//# sourceMappingURL=productVaiants.d.ts.map