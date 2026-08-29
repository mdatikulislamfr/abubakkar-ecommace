import { Request, Response } from "express";
import { Product } from "../../../@types/table.js";
import STATUS from "../../../config/status.js";
import generateBarcode from "../../helpers/generateBarcode.js";
import { BrandModel } from "../../Models/brand.model.js";
import { CategoryModel } from "../../Models/categorys.model.js";
import { ProductModel } from "../../Models/products.model.js";
import Controller from "./Controller.js";
import slugify from 'slugify'
import { ProductReponce } from "../../../@types/index.js";
import productCache from "../../cache/product.cache.js";
const productImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
];
export default new class ProductController extends Controller {
    getQuery = () => ProductModel.joinProducts()
    index = async (req: Request<{ id?: string, slug?: string }>, res: Response) => {
        try {

            const id = req.params.id || req.query.id;
            const slug = req.params.slug || req.query.slug;
            let ti = "serevr";
            let products: Product[] = [];
            if (!productCache.isInitialized()) {
                products = await this.getQuery().orderBy("products.id", "desc");
                productCache.setAll(products);
            } else {
                ti = "case";
                products = productCache.getAll();
            }
            // search
            if (id) {
                const itemProduct = productCache.get(Number(id));
                products = itemProduct ? [itemProduct] : [];
            } else if (slug) {
                const itemProduct = productCache.getBySlug(slug.toString());
                products = itemProduct ? [itemProduct] : [];
            }
            if (products.length == 0) {
                return res._error(STATUS.NOT_FOUND, "Product not found!");
            }

            const productList: ProductReponce[] = products.map((data: Product) => {
                return {
                    id: data?.id || 0,
                    slug: data?.slug || "0",
                    name: data.name,
                    description: data?.description || "",
                    specification: [
                        "USB রিচার্জেবল সিস্টেম – যেকোনো পাওয়ার ব্যাংক বা অ্যাডাপ্টারে চার্জ করা যায়।",
                        "শক্তিশালী মোটর – গভীর টিস্যু মাসাজ নিশ্চিত করে।",
                        "হালকা এবং পোর্টেবল – ব্যাগে খুব সহজেই বহনযোগ্য।",
                    ] as string[],
                    price: Number(data.sale_price) || 0,
                    oldPrice: 0,
                    discount: Number(data.discount),
                    discount_type: data.discount_type,
                    categoryId: Number(data.category_id),
                    categoryName: data.categorie_name || "",
                    images: [productImages[Math.floor(Math.random() * productImages.length)]] as string[],
                    rating: 1.5,
                    reviewCount: 1,
                    stock: data.stock,
                    brand: data.brand_name || "",
                    featured: true,
                    bestSelling: true,
                    newArrival: true,
                    createdAt: data.created_at
                        ? new Date(data.created_at).toISOString()
                        : "",
                }
            })

            return res._success(STATUS.OK, `product list ${ti}`, productList.length == 1 ? productList[0] : productList);
        } catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "some error");
        }
    }
    barcode = async (req: Request<{ text?: string }>, res: Response) => {
        try {
            const { text } = req.params;
            res.set({
                "Content-Type": "image/png",
                "Cross-Origin-Resource-Policy": "cross-origin",
                "Access-Control-Allow-Origin": "*",
            });
            const buffer = await generateBarcode(text?.toString() || "");
            return res.send(buffer)
        } catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error !")
        }
    }
    create = async (req: Request, res: Response) => {
        try {
            const product = req.body as Product;
            const slug = slugify(product.slug.trim(), {
                lower: true,
                trim: true,
            });
            // check slug
            const haveSlug = await ProductModel.table().where("slug", "=", slug).first();
            if (haveSlug) return res._error(STATUS.CONFLICT, `${slug} alredy have!`);
            // check category
            const haveCategory = await CategoryModel.table().where("id", product.category_id).first();
            if (!haveCategory) return res._error(STATUS.NOT_FOUND, "Category not found!");
            // check brnad
            const haveBrand = await BrandModel.table().where("id", product.brand_id).first();
            if (!haveBrand) return res._error(STATUS.NOT_FOUND, "Brand not found!");

            // new product model
            const newProduct: Product = {
                ...product,
                slug,
                barcode: product.sku,

            }
            // insert product with database
            const [insertId] = await ProductModel.table().insert(newProduct);
            const newProductData = await this.getQuery().where("products.id", "=", insertId).first() as Product;
            // cache data on cache systems
            productCache.set(newProductData);
            return res._success(STATUS.CREATED, "success data", newProductData);
        } catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error !")
        }
    }
    update = async (req: Request<{ id?: string }, "", Partial<Product>>, res: Response) => {
        try {
            const { id } = req.params;

            // check product
            const product = await ProductModel
                .table()
                .where("id", Number(id))
                .first();

            if (!product) {
                return res._error(STATUS.NOT_FOUND, "Product not found!");
            }

            const data = req.body;

            // check slug
            if (data.slug !== undefined) {
                const slug = slugify(data.slug.trim(), {
                    lower: true,
                    trim: true,
                });

                const haveSlug = await ProductModel
                    .table()
                    .where("slug", slug)
                    .whereNot("id", Number(id))
                    .first();

                if (haveSlug) {
                    return res._error(STATUS.CONFLICT, `${slug} alredy have!`);
                }

                data.slug = slug;
            }

            // check category
            if (data.category_id !== undefined) {
                const haveCategory = await CategoryModel
                    .table()
                    .where("id", data.category_id)
                    .first();
                if (!haveCategory) {
                    return res._error(STATUS.NOT_FOUND, "Category not found!");
                }
            }

            // check brand
            if (data.brand_id !== undefined) {
                const haveBrand = await BrandModel
                    .table()
                    .where("id", data.brand_id)
                    .first();

                if (!haveBrand) {
                    return res._error(STATUS.NOT_FOUND, "Brand not found!");
                }
            }

            // update product
            const updatedProduct = {
                ...data,
                updated_at: new Date().toISOString(),
            };

            await ProductModel
                .table()
                .where("id", Number(id))
                .update(updatedProduct);


            const newProductData = await this.getQuery().where("products.id", "=", id!).first() as Product;
            // cache data on cache systems
            productCache.set(newProductData);

            return res._success(
                STATUS.OK,
                "Product updated successfully!",
                newProductData
            );
        } catch (error) {
            return res._error(
                STATUS.INTERNAL_SERVER_ERROR,
                error instanceof Error
                    ? error.message
                    : "server error !"
            );
        }
    };
    destroy = async (req: Request<{ id?: string }>, res: Response) => {
        try {
            const { id } = req.params;

            // check product
            const product = await ProductModel.table()
                .where("id", Number(id))
                .whereNull("deleted_at")
                .first();

            if (!product) return res._error(STATUS.NOT_FOUND, "Product not found!");

            // delete product
            await ProductModel.table()
                .where("id", Number(id))
                .update({
                    deleted_at: new Date(),
                });
            // cache data on cache systems
            productCache.delete(Number(id));
            return res._success(STATUS.OK, "Product deleted successfully!");
        } catch (error) {
            return res._error(
                STATUS.INTERNAL_SERVER_ERROR,
                error instanceof Error ? error.message : "server error !"
            );
        }
    };
}