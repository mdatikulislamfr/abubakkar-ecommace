import { Brand } from "../../@types/table.js";
import multer from "../../config/multer.js";
import brandCache from "../cache/brand.cache.js";
import { baseModel } from "./model.js";

export class BrandModel extends baseModel {

     static tableName: string = "brands";
     static async cacheInitialize() {
          if (!brandCache.isInitialized()) {
               const data = await BrandModel.table().where("status", 1).whereNull("deleted_at").orderBy("status", "asc") as Brand[];
               if (data.length > 0) {
                    brandCache.setAll(data);
               }
          }
     }
     static clientresponce(brand: Brand[]): Brand[] {
          return brand.map((data) => {
               return {
                    ...data,
                    logo: multer.path.public(data.logo || "")
               }
          })
     }
}
