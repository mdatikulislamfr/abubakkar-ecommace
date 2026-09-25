import Route from "express-route-framework";

import CategoryController from "../app/Http/Controllers/Category.Controller.js";
import AppController from "../app/Http/Controllers/App.Controller.js";
import OrderController from "../app/Http/Controllers/Order.Controller.js";
import ProductController from "../app/Http/Controllers/Product.Controller.js";
import BrandController from "../app/Http/Controllers/Brand.Controller.js";
import SeoController from "../app/Http/Controllers/Seo.Controller.js";
import { uploadSingle } from "../app/Services/upload.service.js";
import InvoiceController from "../app/Http/Controllers/Invoice.Controller.js";

Route.group({ prefix: "/v1" }, () => {
    // app routes----------------------------------start
    Route.group({ prefix: "/app" }, () => {
        Route.get(`/`, AppController.index);
        Route.post(`/`, uploadSingle("logo"), AppController.set);
        Route.get(`/banners`, AppController.bannaerget);
        Route.post(`/banners`, uploadSingle("images"), AppController.bannaeradd);
        Route.patch(`/banners/:id`, uploadSingle("images"), AppController.update);
        Route.delete(`/banners/:id`, AppController.remove);
    })
    // brand routes----------------------------------start
    Route.group({ prefix: "/brand" }, () => {
        Route.get(`/`, BrandController.index);
        Route.get(`/:id`, BrandController.index);
        Route.post(`/`, uploadSingle("logo"), BrandController.create);
        Route.patch(`/:id`, uploadSingle("logo"), BrandController.update);
        Route.delete(`/:id`, BrandController.destroy)
    })
    // category routes----------------------------------start
    Route.group({ prefix: "/categories" }, () => {
        Route.get(`/`, CategoryController.index);  //compale
        Route.get(`/:id`, CategoryController.index);
        Route.post(`/`, uploadSingle("logo"), CategoryController.create);
        Route.patch(`/:id`, uploadSingle("logo"), CategoryController.update);
        Route.delete(`/:id`, CategoryController.destroy)
    })
    // SEO ROUTE
    Route.group({ prefix: "/seo" }, () => {
        Route.get("/product/:slug", SeoController.index);
        Route.get("/product", SeoController.index);
    })
    // product route
    Route.group({ prefix: "/products" }, () => {
        Route.post(`/`, uploadSingle("images"), ProductController.add);
        Route.get(`/`, ProductController.get);
        Route.get(`/:slug`, ProductController.get);
        Route.put(`/upload-images/:id`, uploadSingle("images"), ProductController.upload);
        Route.get(`/barcode/:text`, ProductController.barcode);
        Route.patch(`/:id`, uploadSingle("images"), ProductController.update);
        Route.delete(`/:id`, ProductController.destroy);
        Route.get("/landing/:slug", ProductController.landingPage);
    })
    // order routes----------------------------------start
    Route.group({ prefix: "/order" }, () => {
        Route.post(`/`, uploadSingle("images"), OrderController.request);
        Route.get(`/`, OrderController.index);
        Route.get(`/:id`, OrderController.index);
        Route.patch(`/:id`, OrderController.update);
        Route.delete(`/:id`, OrderController.destroy);
    })
    Route.group({ prefix: "/invoice" }, () => {
        Route.get(`/:id`, InvoiceController.index);
    })
})
export default Route.getRouter();
