import Route from "express-route-framework";
import SeoController from "../app/Http/Controllers/Seo.Controller.js";
Route.get("/sitemap.xml",SeoController.sitemap);
export default Route.getRouter();