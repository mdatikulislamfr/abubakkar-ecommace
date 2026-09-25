import { Request, Response } from "express";
import Controller from "./Controller.js";
import { Product } from "../../../@types/table.js";
import productCache from "../../cache/product.cache.js";
import { ProductModel } from "../../Models/products.model.js";
import STATUS from "../../../config/status.js";


export default new class SeoController extends Controller {
    index = async (req: Request, res: Response) => {
        try {
            const { slug } = req.params;
            const product: Product = productCache.getBySlug(slug.toString()) || productCache.getAll()[0] as Product;
            return res._success(STATUS.OK, "success", product);
        } catch (e) {
            return res.status(500).json(this._error(e instanceof Error ? e.message : "some error"));
        }
    }
    sitemap = async (_req: Request, res: Response) => {

        try {


            const products: Product[] = await ProductModel.table().select("slug","updated_at") as Product[];

            const urls = products.map((product) => {

                return `
                <url>
                    <loc>https://atik.scashm.xyz/product/${product.slug}</loc>
                    <lastmod>${new Date(product.updated_at || Date.now()).toISOString()}</lastmod>
                </url>
            `;

            }).join("");

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    ${urls}

</urlset>`;

            res.set("Content-Type", "application/xml");

            return res.status(200).send(sitemap);

        } catch (e) {

            return res.status(500).json(
                this._error(
                    e instanceof Error ? e.message : "some error"
                )
            );

        }

    }
}