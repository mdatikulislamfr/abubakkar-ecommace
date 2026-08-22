import { baseModel } from "./model.js";

export class ProductModel extends baseModel {

     static tableName: string = "products";
     static primaryKey: string = "id";
}
