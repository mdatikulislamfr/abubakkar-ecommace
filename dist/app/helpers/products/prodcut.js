import { BrandModel } from "../../Models/brand.model.js";
import { CategoryModel } from "../../Models/categorys.model.js";
import { ProductModel } from "../../Models/products.model.js";
import slugify from 'slugify';
export async function createProduct(product) {
    try {
        const slug = slugify(product.slug.trim(), { lower: true, trim: true });
        const sku = product.sku.trim();
        const [haveSlug, haveCategory, haveBrand, haveSku] = await Promise.all([
            ProductModel.table().where("slug", "=", slug).first(),
            CategoryModel.find(Number(product.category_id)),
            BrandModel.find(Number(product.brand_id)),
            ProductModel.table().where("sku", "=", sku).first(),
        ]);
        // checking
        if (haveSlug)
            throw (`${slug} alredy have!`);
        if (!haveCategory)
            throw ("Category not found!");
        if (!haveBrand)
            throw ("Brand not found!");
        if (haveSku)
            throw (`SKU '${product.sku}' already exists!`);
        // create product
        const productToInsert = {
            id: product.id,
            category_id: product.category_id,
            brand_id: product.brand_id,
            name: product.name.trim(),
            slug: slug,
            sku: product.sku.trim(),
            description: product.description,
            title: product.title,
            unit: product.unit || 'pcs',
            status: product.status,
        };
        const [insertId] = await ProductModel.table().insert(productToInsert);
        const newProduct = await ProductModel.find(insertId);
        if (!newProduct) {
            throw new Error("Failed to retrieve created product");
        }
        return newProduct;
    }
    catch (error) {
        throw (error instanceof Error ? error.message : String(error));
    }
}
//# sourceMappingURL=prodcut.js.map