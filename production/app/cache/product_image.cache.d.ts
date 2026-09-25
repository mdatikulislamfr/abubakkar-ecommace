import { ProductImage } from "../../@types/table.js";
import BaseCache from "./base.cache.js";
declare class ProductImagesCache extends BaseCache<ProductImage> {
    private product_id;
    setAll(data: ProductImage[]): void;
    set(product: ProductImage): void;
    getByProdcutId(product_id: number): ProductImage | undefined;
    delete(id: number): boolean;
    clear(): void;
}
declare const _default: ProductImagesCache;
export default _default;
//# sourceMappingURL=product_image.cache.d.ts.map