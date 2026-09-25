import Controller from "./Controller.js";
import STATUS from "../../../config/status.js";
import { ProductModel } from "../../Models/products.model.js";
import orderCache from "../../cache/order.cache.js";
import { OrderModel } from "../../Models/order.model.js";
import { empty } from "../../helpers/appHelper.js";
import { VarientModel } from "../../Models/varient.model.js";
import { OrderItemModel } from "../../Models/orderItem.model.js";
import crypto from "crypto";
import { AppModel } from "../../Models/app.model.js";
export default new class OrdersController extends Controller {
    // client work
    request = async (req, res) => {
        try {
            const { products, deliveryArea, paymentMethod, customerName, customerPhone, customerAddress } = req.body;
            // chck empty
            if (empty(deliveryArea) ||
                empty(paymentMethod) ||
                empty(customerName) ||
                empty(customerPhone) ||
                empty(customerAddress)) {
                return res._error(STATUS.BAD_REQUEST, "All fields are required and quantity must be greater than 0.");
            }
            const productsArray = JSON.parse(products);
            if (productsArray.length == 0)
                return res._error(STATUS.BAD_REQUEST, "Prodcut not found!");
            const app = await AppModel.table().first();
            // check dalivaryCharge
            let dalivaryCharge = 0;
            if (deliveryArea === this.area.insite) {
                dalivaryCharge = app.insite_dhaka;
            }
            else if (deliveryArea === this.area.outsite) {
                dalivaryCharge = app.outsite_dhaka;
            }
            else {
                return res._error(STATUS.BAD_REQUEST, "Invalid delivery area.");
            }
            // check product and variant id
            const orderProduct = [];
            for (const productData of productsArray) {
                const [product, variant] = await Promise.all([
                    ProductModel.find(Number(productData.productId)),
                    VarientModel.find(Number(productData.variantId))
                ]);
                const discoutPrice = variant.discount_type == "fixed" ? variant.discount : (Number(variant.price) * Number(variant.discount)) / 100;
                const subtotal = Math.floor((variant.price * Number(productData.quantity)));
                if (product && variant) {
                    orderProduct.push({
                        discount: discoutPrice,
                        discount_type: variant.discount_type,
                        product_id: product.id || 0,
                        product_name: product.name + ` ${variant.size}`,
                        quantity: Number(productData.quantity),
                        subtotal: Number(subtotal.toFixed(0)),
                        total: Number(subtotal) - discoutPrice,
                        unit: product.unit,
                        unit_price: variant.price,
                        sku: "ORDER-",
                    });
                }
            }
            const totalDiscount = orderProduct.reduce((_dis, cur) => _dis = cur.discount, 0);
            const subtotal = orderProduct.reduce((_dis, cur) => _dis = cur.subtotal, 0);
            const total = orderProduct.reduce((_dis, cur) => _dis = cur.total, 0) + Number(dalivaryCharge);
            // store customar information
            const custoamrInformation = {
                customer_name: customerName,
                customer_address: customerAddress,
                customer_phone: customerPhone,
                customer_note: "",
                delivary_area: deliveryArea === this.area.insite ? "inside" : "outside",
                delivary_charge: dalivaryCharge,
                discount: totalDiscount,
                subtotal: subtotal,
                total: total,
                payment_method: paymentMethod,
            };
            const generateRandomId = crypto.randomBytes(8).toString('hex').substring(3, 9).toUpperCase();
            const newOrder = {
                ...custoamrInformation,
                status: "pending",
                random_id: generateRandomId,
            };
            const [insertId] = await OrderModel.table().insert(newOrder);
            // product information
            const product = orderProduct.map(d => {
                return { ...d, order_id: insertId };
            });
            await OrderItemModel.table().insert(product);
            return res._success(STATUS.OK, "order successfull", { id: insertId });
        }
        catch (error) {
            console.log(error);
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error");
        }
    };
    // admin work
    index = async (req, res) => {
        try {
            const { phone } = req.query;
            const { id } = req.params;
            let orders = orderCache.getAll();
            if (phone) {
                const order = orderCache.getByPhone(phone.toString());
                orders = order ? [order] : [];
            }
            else if (id) {
                const order = orderCache.get(Number(id));
                if (order) {
                    orders = order ? [order] : [];
                }
                else {
                    const order = orderCache.getByOrderNumber(id.toString());
                    orders = order ? [order] : [];
                }
            }
            if (orders.length == 0)
                return res._error(STATUS.NOT_FOUND, "data not found!");
            return res._success(STATUS.OK, "successfull data get ", orders);
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error");
        }
    };
    update = async (req, res) => {
        try {
            const { customer_name, customer_note, customer_phone, shipping_address, admin_note } = req.body;
            const { id } = req.params;
            if (!customer_name || !customer_note || !customer_phone || !shipping_address) {
                return res._error(STATUS.CONFLICT, "Customr input empty");
            }
            const checkOrder = orderCache.get(Number(id));
            if (!checkOrder)
                return res._error(STATUS.NOT_FOUND, "order not found");
            await OrderModel.table().where("id", id).update({
                customer_name,
                customer_note,
                customer_phone,
                shipping_address,
                admin_note,
            });
            orderCache.set({
                ...checkOrder, customer_name,
                customer_note,
                customer_phone,
                admin_note,
            });
            return res._success(STATUS.OK, "order update successfull");
        }
        catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, e instanceof Error ? e.message : "some serer error!");
        }
    };
    destroy = async (req, res) => {
        try {
            const { id } = req.params;
            // check product
            const product = await OrderModel.table()
                .where("id", Number(id))
                .whereNull("deleted_at")
                .first();
            if (!product)
                return res._error(STATUS.NOT_FOUND, "Order not found!");
            // delete product
            await OrderModel.table()
                .where("id", Number(id))
                .update({
                deleted_at: new Date(),
            });
            // cache data on cache systems
            orderCache.delete(Number(id));
            return res._success(STATUS.OK, "Order deleted successfully!");
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error !");
        }
    };
};
//# sourceMappingURL=Order.Controller.js.map