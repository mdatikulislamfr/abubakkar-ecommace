import Route from "express-route-framework";

import CategoryController from "../app/Http/Controllers/Category.Controller.js";
import AppController from "../app/Http/Controllers/App.Controller.js";
import ReviewsController from "../app/Http/Controllers/Reviews.Controller.js";
import OrderController from "../app/Http/Controllers/Order.Controller.js";
import ProductController from "../app/Http/Controllers/Product.Controller.js";
import BrandController from "../app/Http/Controllers/Brand.Controller.js";


Route.group({ prefix: "/v1" }, () => {
  

    // brand routes----------------------------------start
    Route.group({ prefix: "/brand" }, () => {
        Route.get(`/`, BrandController.index);
        Route.get(`/:id`, BrandController.show);
        Route.post(`/`, BrandController.create);
        Route.patch(`/:id`, BrandController.update);
        Route.delete(`/:id`, BrandController.destroy)
    })
    // category routes----------------------------------start
    Route.group({ prefix: "/categories" }, () => {
        Route.get(`/`, CategoryController.index);
        Route.get(`/:id`, CategoryController.show);
        Route.post(`/`, CategoryController.create);
        Route.patch(`/:id`, CategoryController.update);
        Route.delete(`/:id`, CategoryController.destroy)
    })
    // product route
    Route.group({ prefix: "/products" }, () => {
        Route.get(`/`, ProductController.index);
        Route.get(`/barcode/:text`, ProductController.barcode);
        Route.get(`/:id`, ProductController.index);
        Route.post(`/`, ProductController.create);
        Route.patch(`/:id`, ProductController.update);
        Route.delete(`/:id`, ProductController.destroy);
    })
    // order routes----------------------------------start
    Route.group({ prefix: "/order" }, () => {
        Route.post(`/`, OrderController.order);
        Route.get(`/`, OrderController.index);
        Route.get(`/:id`, OrderController.index);
        Route.patch(`/:id`, OrderController.update);
        Route.delete(`/:id`, OrderController.destroy);
        Route.get(`/invoice/:id`, OrderController.invoice);
    })
    // app routes----------------------------------start
    Route.group({ prefix: "/app" }, () => {
        Route.get(`/`, AppController.index);
        Route.patch(`/`, AppController.appset);
        Route.get(`/banners`, AppController.bannaer);
    })
    // app routes----------------------------------end
    // reviews routes----------------------------------start
    Route.group({ prefix: "/reviews" }, () => {
        Route.get(`/`, ReviewsController.index);
    })
    // reviews routes----------------------------------end

    // order routes----------------------------------end
})
export default Route.getRouter();
