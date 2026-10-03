import multer from "../../config/multer.js";
import productCache from "../cache/product.cache.js";
import { baseModel } from "./model.js";
import { ProductImagesModel } from "./products_iamges.model.js";
import { VarientModel } from "./varient.model.js";
export class ProductModel extends baseModel {
    static tableName = "products";
    static primaryKey = "id";
    static joinProducts() {
        return this.table()
            .join("categories", "products.category_id", "categories.id")
            .join("brands", "products.brand_id", "brands.id")
            .select([
            "products.*",
            "brands.name as brand_name",
            "categories.name as categorie_name",
        ])
            .where("products.deleted_at", null);
    }
    static async cacheInitialize() {
        if (!productCache.isInitialized()) {
            const products = await this.joinProducts().orderBy("products.id", "desc");
            if (products.length > 0) {
                productCache.setAll(products);
                console.log("product cach successfull" + products.length);
            }
        }
    }
    static async update(product) {
        // remove 
        await this.table().where({ id: product.id }).update(product);
        return await this.find(product.id || 0);
    }
    static async clientresponce(products) {
        const ids = products.map(pro => pro?.id || 0);
        const images = await ProductImagesModel.table().where("for", "product").whereIn("product_id", ids).orderBy("id", "desc");
        const varietns = await VarientModel.table().whereIn("product_id", ids);
        // finaly outfut-------------------------------------------------------------
        const product = products.map((pro) => {
            const varietnsData = varietns.filter((data) => data.product_id === pro.id).map((data) => {
                return {
                    id: data?.id || 0,
                    isAvailable: data.stock > data.min_stock,
                    productId: data.product_id,
                    oldPrice: data.old_price,
                    price: data.price,
                    size: data.size,
                    stock: data.stock,
                };
            });
            if (varietnsData.length == 0)
                return null;
            const imagesData = images.filter((img) => img.product_id === pro.id).map(img => {
                return multer.path.public(img.image);
            });
            const firstProduct = varietns[0];
            return {
                brandId: pro.brand_id || 0,
                brandName: pro.brand_name || "",
                categoryId: pro.category_id || 0,
                categoryName: pro.categorie_name || "",
                description: pro.title || "",
                longDescription: pro.description?.split("/n"),
                discount: firstProduct.discount || 0,
                discountType: firstProduct.discount_type || "fixed",
                hasVariants: varietns.length > 0,
                id: pro.id || 0,
                images: imagesData,
                name: pro.name,
                oldPrice: firstProduct.old_price || 0,
                price: firstProduct.price || 0,
                reciveImages: pro.reciveImages || false,
                slug: pro.slug,
                sku: pro.sku,
                variants: varietnsData,
            };
        }).filter(b => Boolean(b));
        return product;
    }
}
//# sourceMappingURL=products.model.js.map