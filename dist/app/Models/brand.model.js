import multer from "../../config/multer.js";
import brandCache from "../cache/brand.cache.js";
import { baseModel } from "./model.js";
export class BrandModel extends baseModel {
    static tableName = "brands";
    static async cacheInitialize() {
        if (!brandCache.isInitialized()) {
            const data = await BrandModel.table().where("status", 1).whereNull("deleted_at").orderBy("status", "asc");
            if (data.length > 0) {
                brandCache.setAll(data);
            }
        }
    }
    static clientresponce(brand) {
        return brand.map((data) => {
            return {
                ...data,
                logo: multer.path.public(data.logo || "")
            };
        });
    }
}
//# sourceMappingURL=brand.model.js.map