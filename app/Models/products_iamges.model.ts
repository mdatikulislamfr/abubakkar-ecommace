import { ProductImage } from "../../@types/table.js";
import ProductImagesCache from "../cache/product_image.cache.js";
import { baseModel } from "./model.js";

export class ProductImagesModel extends baseModel {

     static tableName: string = "product_images";
     static primaryKey: string = "id";

     static async cacheInitialize() {
          const imaegs = await ProductImagesModel.table().select("*").orderBy("is_primary", "desc") as ProductImage[];
          if (!ProductImagesCache.isInitialized()) {
               if (imaegs.length > 0) {
                    ProductImagesCache.setAll(imaegs);
                    console.log("product images cach successfull" + imaegs.length)
               }
          }
     }
     static async create(images: ProductImage | ProductImage[]) {
          return this.table().insert(images);

     }

}
