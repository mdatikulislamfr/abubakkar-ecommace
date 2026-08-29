import { Product } from "../../@types/table.js";
import BaseCache from "./base.cache.js";

class ProductCache extends BaseCache<Product> {

    private slugCache = new Map<string, Product>();

    setAll(products: Product[]): void {
        super.setAll(products);
        products.forEach((product) => {
            this.slugCache.set(product.slug, product);
        });
    }

    set(product: Product): void {
        super.set(product);
        this.slugCache.set(product.slug, product);
    }

    getBySlug(slug: string): Product | undefined {
        return this.slugCache.get(slug);
    }

    delete(id: number): boolean {
        const product = this.get(id);
        if (product) {
            this.slugCache.delete(product.slug);
        }
        return super.delete(id);
    }

    clear(): void {
        super.clear();
        this.slugCache.clear();
    }
}
export default new ProductCache();