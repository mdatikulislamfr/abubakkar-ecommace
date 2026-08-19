import Route from "express-route-framework";

import { Authentication } from 'express-auth-framework'
import UsersController from "../app/Http/Controllers/Users.Controller.js";
import CategoryController from "../app/Http/Controllers/Category.Controller.js";
import AppController from "../app/Http/Controllers/App.Controller.js";
import ReviewsController from "../app/Http/Controllers/Reviews.Controller.js";
import OrderController from "../app/Http/Controllers/Order.Controller.js";
import ProductController from "../app/Http/Controllers/Product.Controller.js";
import BrandController from "../app/Http/Controllers/Brand.Controller.js";


Route.group({ prefix: "/v1" }, () => {
    // user routes
    Route.group({ prefix: "/users" }, () => {
        Route.post(`/`, UsersController.registation);
        Route.post(`/reset/send-code`, UsersController.sendcode);
        Route.post(`/reset/varify-code`, UsersController.varyfacatin);
        Route.patch(`/update-pass`, UsersController.updaetPass);
        Route.post(`/login`, UsersController.login);
        Route.post(`/logout`, Authentication, UsersController.logout);
        Route.patch(`/pass-update`, Authentication, UsersController.uppassword);
        Route.patch(`/info-update`, Authentication, UsersController.infoupdate);
        Route.group({ prefix: "/affiliate" }, () => {
            Route.get(`profile`, UsersController.profile);
            Route.get(`refhistory`, UsersController.refhistoy);
        })
    })
    // product route
    Route.group({ prefix: "/products" }, () => {
        Route.get(`/`, ProductController.index);
        Route.get(`/:id`, ProductController.show);
        Route.post(``, ProductController.create);
        Route.patch(`/:id`, ProductController.update);
        Route.delete(`/:id`, ProductController.destroy);
    })
    // category routes----------------------------------start
    Route.group({ prefix: "/categories" }, () => {
        Route.get(`/`, CategoryController.index);
        Route.get(`/:id`, CategoryController.show);
        Route.post(`/`, CategoryController.create);
        Route.patch(`/:id`, CategoryController.update);
        Route.delete(`/:id`, CategoryController.destroy)
    })
    // brand routes----------------------------------start
    Route.group({ prefix: "/brand" }, () => {
        Route.get(`/`, BrandController.index);
        Route.get(`/:id`, BrandController.show);
        Route.post(`/`, BrandController.create);
        Route.patch(`/:id`, BrandController.update);
        Route.delete(`/:id`, BrandController.destroy)
    })
    // app routes----------------------------------start
    Route.group({ prefix: "/app" }, () => {
        Route.get(`/`, AppController.index);
        Route.get(`/banners`, AppController.bannaer);
    })
    // app routes----------------------------------end
    // reviews routes----------------------------------start
    Route.group({ prefix: "/reviews" }, () => {
        Route.get(`/`, ReviewsController.index);
    })
    // reviews routes----------------------------------end
    // order routes----------------------------------start
    Route.group({ prefix: "/order" }, () => {
        Route.post(`/`, OrderController.order);
        Route.get(`/invoice/:id`, OrderController.invoice);
    })
    // order routes----------------------------------end
})
export default Route.getRouter();
