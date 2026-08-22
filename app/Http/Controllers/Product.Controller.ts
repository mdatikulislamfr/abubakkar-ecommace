import { Request, Response } from "express";
import { Product } from "../../../@types/table.js";
import STATUS from "../../../config/status.js";
import generateBarcode from "../../helpers/generateBarcode.js";
import { BrandModel } from "../../Models/brand.model.js";
import { CategoryModel } from "../../Models/categorys.model.js";
import { ProductModel } from "../../Models/products.model.js";
import Controller from "./Controller.js";
import slugify from 'slugify'

export default new class ProductController extends Controller {

    index = async (req: Request<{ id?: string, slug?: string }>, res: Response) => {
        try {
            const id = req.params.id || req.query.id;
            const slug = req.params.slug || req.query.slug;
            const start = performance.now();
            const products: Product[] = await ProductModel.table()
                .join("categories", "products.category_id", "categories.id")
                .join("brands", "products.brand_id", "brands.id")
                .select([
                    "products.*",
                    // brand
                    "brands.name as brand_name",
                    "brands.slug as brand_slug",
                    "brands.description as brand_description",
                    "brands.logo as brand_logo",
                    // category
                    "categories.name as categorie_name",
                    "categories.slug as categorie_slug",
                    "categories.description as categorie_description",
                    "categories.image as categorie_logo",

                ])
                .modify((query) => {
                    if (id) {
                        return query.where("products.id", "=", id.toString()).first();
                    }
                    if (slug) {
                        return query.where("products.slug", "=", slug.toString()).first();
                    }
                    return query;
                })
                .where("products.deleted_at", null)
                .orderBy("products.id", "desc");
            const end = performance.now();
            if (!products) {
                    return res._error(STATUS.NOT_FOUND, "Product not found!");
            }
            return res._success(STATUS.OK, `product list ${(end - start).toFixed(2)}ms`, products);
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
            const newdata = await ProductModel.find(insertId) as Product;
            return res._success(STATUS.CREATED, "success data", newdata);
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

            const newdata = await ProductModel.find(Number(id)) as Product;

            return res._success(
                STATUS.OK,
                "Product updated successfully!",
                newdata
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
            return res._success(STATUS.OK, "Product deleted successfully!");
        } catch (error) {
            return res._error(
                STATUS.INTERNAL_SERVER_ERROR,
                error instanceof Error ? error.message : "server error !"
            );
        }
    };
}