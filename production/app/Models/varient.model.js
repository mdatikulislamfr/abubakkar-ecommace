import { baseModel } from "./model.js";
export class VarientModel extends baseModel {
    static tableName = "product_variants";
    static primaryKey = "id";
    static async update(product_id, variants) {
        await this.table().where({ product_id }).del();
        if (variants && variants.length > 0) {
            await this.table().insert(variants);
        }
        return true;
    }
}
//# sourceMappingURL=varient.model.js.map