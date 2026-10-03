import Controller from "./Controller.js";
import STATUS from "../../../config/status.js";
import { ProductModel } from "../../Models/products.model.js";
import { OrderModel } from "../../Models/order.model.js";
import { empty } from "../../helpers/appHelper.js";
import { VarientModel } from "../../Models/varient.model.js";
import { OrderItemModel } from "../../Models/orderItem.model.js";
import crypto from "crypto";
import { AppModel } from "../../Models/app.model.js";
import { Worker } from "worker_threads";
import multer from "../../../config/multer.js";
import { ProductImagesModel } from "../../Models/products_iamges.model.js";
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
                const varientSize = variant.size;
                if (product && variant) {
                    orderProduct.push({
                        discount: discoutPrice,
                        discount_type: variant.discount_type,
                        product_id: product.id || 0,
                        product_name: product.name,
                        quantity: Number(productData.quantity),
                        subtotal: Number(subtotal.toFixed(0)),
                        total: Number(subtotal) - discoutPrice,
                        unit: product.unit,
                        unit_price: variant.price,
                        sku: product.sku,
                        size: varientSize
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
            // upload atusment
            const file = req.file;
            if (file) {
                const imageProcessing = new Worker(this.workerPath, {
                    workerData: {
                        inputPath: req.file?.buffer,
                        label: true,
                        outputPath: multer.path.upload()
                    }
                });
                imageProcessing.on('message', async (result) => {
                    if (result.success) {
                        await ProductImagesModel.create({
                            for: "order",
                            image: result.name,
                            is_primary: true,
                            sort_order: 1,
                            status: true,
                            product_id: insertId
                        });
                    }
                });
            }
            return res._success(STATUS.OK, "order successfull", { id: insertId });
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error");
        }
    };
    // admin work
    index = async (req, res) => {
        try {
            // const { phone } = req.query;
            const { id } = req.params;
            let singel = false;
            let orders = await OrderModel.table().orderBy("id", "desc");
            if (id) {
                orders = await OrderModel.table().where({ id: id });
                singel = true;
            }
            const send = await OrderModel.clientResponce(orders);
            if (send.length == 0)
                return res._error(STATUS.NOT_FOUND, "data not found!");
            return res._success(STATUS.OK, "successfull data get ", singel ? send[0] : send);
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error");
        }
    };
    details = async (req, res) => {
        try {
            const id = req.params.id;
            if (!id)
                return res._error(STATUS.NOT_FOUND, "data not found!");
            const order = await OrderModel.find(Number(id));
            if (!order)
                return res._error(STATUS.NOT_FOUND, "Order not found");
            const orderItem = await OrderItemModel.table().where({ order_id: id });
            const atusment = await ProductImagesModel.table().where({ for: "order" }).andWhere("product_id", "=", order.id).first();
            // product items
            const productIds = orderItem.map(item => Number(item.product_id));
            const images = await ProductImagesModel
                .table()
                .where({ for: "product" })
                .where({ is_primary: true })
                .whereIn("product_id", productIds);
            const details = {
                random_id: order.random_id,
                status: order.status,
                payment_status: order.payment_status,
                ordered_at: order.created_at,
                customer_name: order.customer_name,
                customer_phone: order.customer_phone,
                customer_address: order.customer_address,
                delivary_area: order.delivary_area,
                customer_note: order.customer_note,
                payment_method: order.payment_method,
                subtotal: order.subtotal,
                delivary_charge: order.delivary_charge,
                discount: order.discount,
                total: order.total,
                selected_image: multer.path.public(atusment.image || ""),
                items: orderItem.map((item) => {
                    const imaegs = images.find((img) => Number(img.product_id) === Number(item.product_id));
                    return {
                        name: item.product_name,
                        image: multer.path.public(imaegs.image || ""),
                        size: item.size,
                        color: null,
                        price: item.unit_price,
                        quantity: item.quantity
                    };
                })
            };
            return res._success(STATUS.OK, "Successfull", details);
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error");
        }
    };
    update = async (req, res) => {
        try {
            const { customer_name, customer_note, customer_phone, customer_address, admin_note, status, payment_status } = req.body;
            const { id } = req.params;
            if (!customer_name || !customer_phone || !customer_address || !status || !payment_status) {
                return res._error(STATUS.CONFLICT, "Customr input empty");
            }
            await OrderModel.table().where("id", id).update({
                customer_name,
                customer_note,
                customer_phone,
                customer_address,
                admin_note,
                status,
                payment_status
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
            return res._success(STATUS.OK, "Order deleted successfully!");
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : "server error !");
        }
    };
};
//# sourceMappingURL=Order.Controller.js.map