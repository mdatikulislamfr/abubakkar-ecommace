import { Request, Response } from "express";
import { Product, ProductVariant } from "../../../@types/table.js";
import STATUS from "../../../config/status.js";
import generateBarcode from "../../helpers/generateBarcode.js";
import { ProductModel } from "../../Models/products.model.js";
import Controller from "./Controller.js";
import productCache from "../../cache/product.cache.js";
import path from "path";
import { Worker } from "worker_threads";
import { ProductImagesModel } from "../../Models/products_iamges.model.js";
import { createProduct } from "../../helpers/products/prodcut.js";
import multer from "../../../config/multer.js";
import { createImages } from "../../helpers/products/productImage.js";
import { createVarient } from "../../helpers/products/productVaiants.js";
import { VarientModel } from "../../Models/varient.model.js";
const workerPath = path.join(process.cwd(), 'app/Worker/imageWorker.js');

export default new class ProductController extends Controller {
    // create prodcut
    add = async (req: Request, res: Response) => {
        try {
            const { categoryId, brandId, name, slug, description, sku, title, status, variants } = req.body;
            if (!categoryId || !brandId || !name || !slug || !title || !sku) {
                return res._error(STATUS.BAD_REQUEST, "input data empty");
            }
            const productVerients: ProductVariant[] = JSON.parse(variants);
            if (!Array.isArray(productVerients) || productVerients.length == 0) {
                return res._error(STATUS.BAD_REQUEST, "product varients field now empty");
            }
            const productObject: Product = { category_id: categoryId, brand_id: brandId, name, slug, sku, description, title, unit: "pc", status, id: 1 };

            const newProduct: Product = await createProduct(productObject);
            const newVarients: ProductVariant[] = productVerients.map((data) => {
                return {
                    ...data,
                    product_id: newProduct.id || 0,
                }
            })
            await createVarient(newVarients)
            if (req.file) {
                // add product image
                const imageProcessing = new Worker(workerPath, {
                    workerData: {
                        inputPath: req.file?.buffer,
                        outputPath: multer.path.upload("/")
                    }
                })
                imageProcessing.on('message', async (result) => {
                    try {
                        if (result.name) {
                            await createImages({
                                id: 1,
                                for: "product",
                                image: result.name,
                                is_primary: true,
                                product_id: newProduct.id || 0,
                                sort_order: 1,
                                status: true,
                            })
                        }
                    } catch (error) {
                        return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : String(error));
                    }
                })
            }
            productCache.set(newProduct);
            const send = await ProductModel.clientresponce([newProduct]);
            return res._success(STATUS.CREATED, "product create successfull", send[0]);
        } catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : String(error));
        }
    }
    // get
    get = async (req: Request, res: Response) => {
        try {
            const slug = req.query.slug || req.params.slug;
            // all data
            let products: Product[] = [];
            let single: boolean = false;
            if (slug) {
                products = await ProductModel.joinProducts().andWhere("products.slug", "=", slug.toString().trim() || "");
                single = true;
            } else {
                products = productCache.getAll();
                single = false;
            }
            if (!products || products.length == 0) return res._error(STATUS.NOT_FOUND, "Product list not found!");
            const product = await ProductModel.clientresponce(products);
            return res._success(STATUS.OK, "product list", single ? product[0] : product);
        } catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error !")
        }
    }
    // upload product imaeg
    upload = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) return res._error(STATUS.NOT_FOUND, "product id not found");
            const findProduct = await ProductModel.find(Number(id)) as Product;
            if (!findProduct) return res._error(STATUS.NOT_FOUND, "Product not found!");
            //  images prosessing
            if (!req.file?.buffer) {
                return res._error(STATUS.BAD_REQUEST, "Image file is required!");
            }
            const imageProcessing = new Worker(workerPath, {
                workerData: {
                    inputPath: req.file?.buffer,
                    outputPath: multer.path.storage("/uploads"),
                }
            })
            imageProcessing.on('error', (err) => {
                if (!res.headersSent) {
                    return res._error(STATUS.INTERNAL_SERVER_ERROR, "Image Processing Failed: " + String(err));
                }
            });
            imageProcessing.on('message', async (result) => {
                if (!res.headersSent) {
                    if (result.success) {
                        try {
                            await createImages({
                                id: 1,
                                product_id: findProduct.id || 0,
                                for: "product",
                                image: result.name,
                                is_primary: false,
                                sort_order: 1,
                                status: true,
                            })
                            return res._success(STATUS.CREATED, "images upload successfully");
                        } catch (dbError) {
                            return res._error(STATUS.INTERNAL_SERVER_ERROR, "Database Error: " + String(dbError));
                        }
                    } else {
                        return res._error(STATUS.INTERNAL_SERVER_ERROR, "Processing failed: " + result.error);
                    }
                }
            });
        } catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error !")
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
    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res._error(STATUS.BAD_REQUEST, "Product ID is required for update");
            }
            const { categoryId, brandId, name, slug, description, sku, title, status, variants } = req.body;
            if (!categoryId || !brandId || !name || !slug || !title || !sku) {
                return res._error(STATUS.BAD_REQUEST, "input data empty");
            }
            let productVerients: ProductVariant[] = [];
            if (variants) {
                productVerients = JSON.parse(variants);
                if (!Array.isArray(productVerients) || productVerients.length == 0) {
                    return res._error(STATUS.BAD_REQUEST, "product varients field now empty");
                }
            }
            const productObject: Product = {
                id: Number(id),
                unit: "pc",
                category_id: categoryId,
                brand_id: brandId,
                name,
                slug,
                sku,
                description,
                title,
                status
            };
            const updateProduct = await ProductModel.update(productObject);
            productCache.set(updateProduct);
            // varient update
            if (productVerients.length > 0) {
                const newVarients: ProductVariant[] = productVerients.map((data) => {
                    return {
                        ...data,
                        product_id: Number(id),
                    }
                })
                await VarientModel.update(Number(id), newVarients);
            }
            if (req.file) {
                const imageProcessing = new Worker(workerPath, {
                    workerData: {
                        inputPath: req.file?.buffer,
                        outputPath: multer.path.upload("/")
                    }
                })
                imageProcessing.on('message', async (result) => {
                    try {
                        if (result.name) {
                            await ProductImagesModel.create({
                                for: "product",
                                id: 1,
                                image: result.name,
                                is_primary: true,
                                product_id: Number(id),
                                sort_order: 1,
                                status: true,
                            })
                        }
                    } catch (error) {
                        console.error("Image Processing DB Error: ", error);
                    }
                })
            }
            const product = await ProductModel.clientresponce([updateProduct]);
            return res._success(STATUS.OK, "product updated successfully", product[0]);
        } catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : String(error));
        }
    }
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
    // landing page
    landingPage = async (req: Request, res: Response) => {
        try {
            const prodcut = productCache.getBySlug(req.params.slug.toString());
            if (!prodcut) return res._error(STATUS.BAD_REQUEST, "Product not found");
            const page = (await ProductModel.clientresponce([prodcut]))[0];
            return res._success(STATUS.OK, "landing page", page);
        } catch (error) {
            return res._error(
                STATUS.INTERNAL_SERVER_ERROR,
                error instanceof Error ? error.message : "server error !"
            );
        }
    }
}