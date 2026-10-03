import { Product } from "../../@types/table.js";
import BaseCache from "./base.cache.js";
declare class ProductCache extends BaseCache<Product> {
    private slugCache;
    setAll(products: Product[]): void;
    set(product: Product): void;
    getBySlug(slug: string): Product | undefined;
    delete(id: number): boolean;
    clear(): void;
}
declare const _default: ProductCache;
export default _default;
//# sourceMappingURL=product.cache.d.ts.map