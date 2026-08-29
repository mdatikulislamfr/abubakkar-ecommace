import { Product } from "../../@types/table.js";
import productCache from "../cache/product.cache.js";
import { baseModel } from "./model.js";

export class ProductModel extends baseModel {

     static tableName: string = "products";
     static primaryKey: string = "id";

     static joinProducts() {
          return this.table()
               .join("categories", "products.category_id", "categories.id")
               .join("brands", "products.brand_id", "brands.id")
               .select([
                    "products.*",
                    // brand
                    "brands.name as brand_name",
                    "brands.slug as brand_slug",
                    "brands.description as brand_description",
                    "brands.logo as brand_logo",
                    // category
                    "categories.name as categorie_name",
                    "categories.slug as categorie_slug",
                    "categories.description as categorie_description",
                    "categories.image as categorie_logo",

               ])
               .where("products.deleted_at", null)
     }
     static async cachingOnModel() {
          if (!productCache.isInitialized()) {
               const products: Product[] = await this.joinProducts().orderBy("products.id", "desc");
               productCache.setAll(products);
          }
     }
}
