import Controller from "./Controller.js";
import { OrderModel } from "../../Models/order.model.js";
import STATUS from "../../../config/status.js";
import { OrderItemModel } from "../../Models/orderItem.model.js";
export default new class InvoicesController extends Controller {
    index = async (req, res) => {
        try {
            const { id } = req.params;
            const order = await OrderModel.find(Number(id));
            if (!order)
                return res._error(STATUS.NOT_FOUND, "invoice not found");
            const order_items = await OrderItemModel.table().where("order_id", id);
            let item = [];
            if (order_items.length) {
                item = order_items.map((product_item) => {
                    return {
                        amount: product_item.unit_price * product_item.quantity,
                        description: product_item.product_name,
                        id: String(product_item?.id) || "1",
                        quantity: product_item.quantity,
                        rate: product_item.unit_price,
                    };
                });
            }
            const clinetInformation = {
                email: order.customer_phone,
                name: order.customer_name,
                address: order.customer_address,
                city: order.delivary_area === "inside" ? "Dhaka" : "Out of Dhaka",
                country: "Bangladesh",
            };
            const billerInfo = {
                email: order.customer_phone,
                name: order.customer_name,
                address: order.customer_address,
            };
            const invoiceSummary = {
                paidAmount: order.payment_status === "paid" ? order.total : 0,
                pendingAmount: order.payment_status === "paid" ? 0 : order.total,
                totalAmount: order.total,
                totalCount: item.length
            };
            const invoice = {
                biller: billerInfo,
                client: clinetInformation,
                dueDate: new Date(order.created_at).toLocaleDateString(),
                id: order.random_id,
                InvoiceSummary: invoiceSummary,
                issueDate: new Date(order.created_at).toLocaleDateString(),
                items: item,
                status: order.status,
                subtotal: order.subtotal,
                tax: order.delivary_charge,
                total: order.total,
                discount: order.discount,
                notes: order.admin_note || "",
            };
            return res.status(200).json(this._success("order success", invoice));
        }
        catch (e) {
            return res.status(500).json(this._error("some error", { error: e instanceof Error ? e.message : "some serer errro" }));
        }
    };
};
//# sourceMappingURL=Invoice.Controller.js.map