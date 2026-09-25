import BaseCache from "./base.cache.js";
class ProductImagesCache extends BaseCache {
    product_id = new Map();
    setAll(data) {
        super.setAll(data);
        data.forEach((item) => {
            this.product_id.set(item.product_id, item);
        });
        this.initialized = true;
    }
    set(product) {
        super.set(product);
        this.product_id.set(product.product_id, product);
    }
    getByProdcutId(product_id) {
        return this.product_id.get(product_id);
    }
    delete(id) {
        const product = this.get(id);
        if (product) {
            this.product_id.delete(product.product_id);
        }
        return super.delete(id);
    }
    clear() {
        super.clear();
        this.product_id.clear();
    }
}
export default new ProductImagesCache();
//# sourceMappingURL=product_image.cache.js.map