import { ProductVariant } from "../../@types/table.js";
import { baseModel } from "./model.js";

export class VarientModel extends baseModel {

     static tableName: string = "product_variants";
     static primaryKey: string = "id";


     static async update(product_id: number, variants: ProductVariant[]) {
          await this.table().where({ product_id }).del();
          if (variants && variants.length > 0) {
               await this.table().insert(variants);
          }
          return true;
     }

}
