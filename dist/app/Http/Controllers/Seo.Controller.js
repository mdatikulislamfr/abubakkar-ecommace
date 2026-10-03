import Controller from "./Controller.js";
import productCache from "../../cache/product.cache.js";
import { ProductModel } from "../../Models/products.model.js";
import STATUS from "../../../config/status.js";
export default new class SeoController extends Controller {
    index = async (req, res) => {
        try {
            const { slug } = req.params;
            const product = productCache.getBySlug(slug.toString()) || productCache.getAll()[0];
            return res._success(STATUS.OK, "success", product);
        }
        catch (e) {
            return res.status(500).json(this._error(e instanceof Error ? e.message : "some error"));
        }
    };
    sitemap = async (_req, res) => {
        try {
            const products = await ProductModel.table().select("slug", "updated_at");
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
        }
        catch (e) {
            return res.status(500).json(this._error(e instanceof Error ? e.message : "some error"));
        }
    };
};
//# sourceMappingURL=Seo.Controller.js.map