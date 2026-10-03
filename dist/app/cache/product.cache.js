import BaseCache from "./base.cache.js";
class ProductCache extends BaseCache {
    slugCache = new Map();
    setAll(products) {
        super.setAll(products);
        products.forEach((product) => {
            this.slugCache.set(product.slug, product);
        });
    }
    set(product) {
        super.set(product);
        this.slugCache.set(product.slug, product);
    }
    getBySlug(slug) {
        return this.slugCache.get(slug);
    }
    delete(id) {
        const product = this.get(id);
        if (product) {
            this.slugCache.delete(product.slug);
        }
        return super.delete(id);
    }
    clear() {
        super.clear();
        this.slugCache.clear();
    }
}
export default new ProductCache();
//# sourceMappingURL=product.cache.js.map