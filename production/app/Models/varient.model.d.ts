import { ProductVariant } from "../../@types/table.js";
import { baseModel } from "./model.js";
export declare class VarientModel extends baseModel {
    static tableName: string;
    static primaryKey: string;
    static update(product_id: number, variants: ProductVariant[]): Promise<boolean>;
}
//# sourceMappingURL=varient.model.d.ts.map