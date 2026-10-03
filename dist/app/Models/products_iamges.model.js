import ProductImagesCache from "../cache/product_image.cache.js";
import { baseModel } from "./model.js";
export class ProductImagesModel extends baseModel {
    static tableName = "product_images";
    static primaryKey = "id";
    static async cacheInitialize() {
        const imaegs = await ProductImagesModel.table().select("*").orderBy("is_primary", "desc");
        if (!ProductImagesCache.isInitialized()) {
            if (imaegs.length > 0) {
                ProductImagesCache.setAll(imaegs);
                console.log("product images cach successfull" + imaegs.length);
            }
        }
    }
    static async create(images) {
        return this.table().insert(images);
    }
}
//# sourceMappingURL=products_iamges.model.js.map