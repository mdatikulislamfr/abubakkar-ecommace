import { Request, Response } from "express";
import Controller from "./Controller.js";
import { Order, OrderItem, Product } from "../../../@types/table.js";
import STATUS from "../../../config/status.js";
import { OrderRequest } from "../../../@types/index.js";
import { ProductModel } from "../../Models/products.model.js";
import orderCache from "../../cache/order.cache.js";
import productCache from "../../cache/product.cache.js";
import { OrderModel } from "../../Models/order.model.js";
import { OrderItemModel } from "../../Models/orderItem.model.js";
import { fakeId } from "../../helpers/appHelper.js";
import { deliveryHelper } from "../../helpers/delivaryHelper.js";


export default new class OrdersController extends Controller {


    index = async (req: Request<{ order_id?: string, phone?: string, id?: string }>, res: Response) => {
        try {
            const { phone } = req.query;
            const { id } = req.params;
            await OrderModel.cachingOnModel();
            let orders: Order[] = orderCache.getAll() as Order[];
            if (phone) {
                const order = orderCache.getByPhone(phone.toString());
                orders = order ? [order] : [];
            } else if (id) {
                const order = orderCache.get(Number(id));
                if (order) {
                    orders = order ? [order] : [];
                } else {
                    const order = orderCache.getByOrderNumber(id.toString());
                    orders = order ? [order] : [];
                }
            }
            if (orders.length == 0) return res._error(STATUS.NOT_FOUND, "data not found!")
            return res._success(STATUS.OK, "successfull data get ", orders)
        } catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error");
        }
    }
    order = async (req: Request, res: Response) => {
        try {
            const { customer_name, customer_note, customer_phone, shipping_address, products, delivary_area } = req.body as OrderRequest;

            if (products.length === 0) return res._error(STATUS.CONFLICT, "Order product empty");
            if (!customer_name || !customer_phone || !shipping_address || !delivary_area) {
                return res._error(STATUS.CONFLICT, "Customr input empty");
            }
            // product item send db //order prodcut
            await ProductModel.cachingOnModel();
            await OrderModel.cachingOnModel();

            const orderItem: OrderItem[] = products.map((data) => {
                const product: Product = productCache.get(Number(data.id)) as Product;
                if (!product) return null;
                const quantity = Number(data.quantity);

                if (!Number.isFinite(quantity) || quantity <= 0) {
                    return null;
                }
                const subtotal = (product.sale_price * Number(data.quantity));
                const total =
                    product.discount_type === "fixed"
                        ? subtotal - (product.discount * Number(data.quantity))
                        : subtotal - ((subtotal * Number(product.discount) / 100));
                return {
                    order_id: 0,
                    product_id: product.id,
                    product_name: product.name,
                    sku: product.sku,
                    quantity: Number(data.quantity),
                    unit_price: product.sale_price,
                    discount: Number(product.discount),
                    discount_type: product.discount_type,
                    subtotal,
                    total,
                }
            }).filter(data => Boolean(data)) as OrderItem[]
            if (orderItem.length == 0) {
                return res._error(STATUS.NOT_FOUND, "Invalid product id !")
            }
            // order system only customar information 
            const total = orderItem.reduce((pre: number, cur) => pre + Number(cur.total), 0);
            const discount = orderItem.reduce((pre: number, cur) => pre + Number(cur.discount), 0);
            // app model get for 
            const dealivary = await deliveryHelper(delivary_area);
            
            const neworder: Order = {
                customer_name,
                customer_note,
                customer_phone,
                shipping_address,
                order_number: `ORD-${Date.now()}-${String(fakeId(4)).padStart(4, "0")}`,
                discount: discount,
                due_amount: total,
                total,
                subtotal: (total + discount) - dealivary.charage,
                payment_method: "Case One Delivery",
                status: "pending",
                id: 0,
                delivary_area: dealivary.where,
                delivary_charge: dealivary.charage
            }
            const successOrder = await OrderModel.table().insert(neworder);
            const orderInformation = await OrderModel.find(successOrder[0]) as Order;
            await OrderItemModel.table().insert(orderItem.map(data => ({ ...data, order_id: orderInformation.id })));
            const orderItemInforamtion = await OrderItemModel.table().where("order_id", orderInformation.id);
            const responce = {
                ...orderInformation,
                products: orderItemInforamtion
            }
            // cache
            orderCache.set(responce);
            return res._success(STATUS.OK, "order successfull", responce);
        } catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error");
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            const { customer_name, customer_note, customer_phone, shipping_address, admin_note } = req.body as OrderRequest;
            const { id } = req.params;
            if (!customer_name || !customer_note || !customer_phone || !shipping_address) {
                return res._error(STATUS.CONFLICT, "Customr input empty");
            }
            await ProductModel.cachingOnModel();
            await OrderModel.cachingOnModel();
            const checkOrder = orderCache.get(Number(id));
            if (!checkOrder) return res._error(STATUS.NOT_FOUND, "order not found");
            await OrderModel.table().where("id", id).update({
                customer_name,
                customer_note,
                customer_phone,
                shipping_address,
                admin_note,
            })
            orderCache.set({
                ...checkOrder, customer_name,
                customer_note,
                customer_phone,
                shipping_address,
                admin_note,
            })
            return res._success(STATUS.OK, "order update successfull");
        } catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, e instanceof Error ? e.message : "some serer error!");
        }
    }
    invoice = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await OrderModel.cachingOnModel();
            const data = orderCache.getByOrderNumber(id.toString());
            if (!data) return res._error(STATUS.NOT_FOUND, "invoice not found");
            return res.status(200).json(this._success("order success", data));
        } catch (e) {
            return res.status(500).json(this._error("some error", { error: e instanceof Error ? e.message : "some serer errro" }));
        }
    }
    destroy = async (req: Request<{ id?: string }>, res: Response) => {
        try {
            const { id } = req.params;

            // check product
            const product = await OrderModel.table()
                .where("id", Number(id))
                .whereNull("deleted_at")
                .first();

            if (!product) return res._error(STATUS.NOT_FOUND, "Order not found!");

            // delete product
            await OrderModel.table()
                .where("id", Number(id))
                .update({
                    deleted_at: new Date(),
                });
            // cache data on cache systems
            orderCache.delete(Number(id));
            return res._success(STATUS.OK, "Order deleted successfully!");
        } catch (error) {
            return res._error(
                STATUS.INTERNAL_SERVER_ERROR,
                error instanceof Error ? error.message : "server error !"
            );
        }
    };
}