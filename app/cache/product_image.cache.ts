
import { ProductImage } from "../../@types/table.js";
import BaseCache from "./base.cache.js";

class ProductImagesCache extends BaseCache<ProductImage> {
    private product_id = new Map<number, ProductImage>();
    setAll(data: ProductImage[]): void {
        super.setAll(data);
        data.forEach((item) => {
            this.product_id.set(item.product_id, item);
        });
        this.initialized = true;
    }

    set(product: ProductImage): void {
        super.set(product);
        this.product_id.set(product.product_id, product);
    }

    getByProdcutId(product_id: number): ProductImage | undefined {
        return this.product_id.get(product_id);
    }

    delete(id: number): boolean {
        const product = this.get(id);
        if (product) {
            this.product_id.delete(product.product_id);
        }
        return super.delete(id);
    }

    clear(): void {
        super.clear();
        this.product_id.clear();
    }

}
export default new ProductImagesCache();