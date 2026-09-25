import { Category } from "../../@types/table.js";
import multer from "../../config/multer.js";
import categoryCache from "../cache/category.cache.js";
import { baseModel } from "./model.js";

export class CategoryModel extends baseModel {

     static tableName: string = "categories";

     static async cacheInitialize() {
          if (!categoryCache.isInitialized()) {
               const data = await CategoryModel.table().where("status", "1").whereNull("deleted_at").orderBy("status", "asc") as Category[];
               if (data.length > 0) {
                    categoryCache.setAll(data);
               }
          }
     }

     static clientresponce(cateogry: Category[]) {
          return cateogry.map((cate) => {
               return {
                    ...cate,
                    image: multer.path.public(cate.image || "")
               }
          })
     }
}
