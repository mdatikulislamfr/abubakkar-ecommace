import { Request, Response } from "express";
import Controller from "./Controller.js";
import { Order } from "../../../@types/table.js";
import STATUS from "../../../config/status.js";


export default new class OrdersController extends Controller {
    lastIndex = 0;
    discount = 10;
    index = () => {

    }
    order = (req: Request, res: Response) => {
        try {
            const { customer_name, customer_note, customer_phone, shipping_address } = req.body as Order;
            if (!customer_name || !customer_note || !customer_phone || !shipping_address) {
                return res._error(STATUS.CONFLICT, "Customr input empty");
            }
            const total = 100;
            const neworder: Order = {
                ...req.body,
                order_number: `ORD-${Date.now()}-${String(this.lastIndex++).padStart(4, "0")}`,
                discount: this.discount,
                due_amount: total,
                total,
                subtotal: total - this.discount,
                payment_method: "case one dealivary",
                status: "pending",
            }
            return res._success(STATUS.OK, "order successfull", neworder);
        } catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, e instanceof Error ? e.message : "some serer error!");
        }
    }
    invoice = (_: Request, res: Response) => {
        try {
            const send = {
                customar: {
                    id: 1,
                    name: "Md Atikul Islam",
                    tel: "0177XXXXX",
                    address: "Dhaka",
                    area: "InDhaka",
                    comment: "sdfhjksdf",
                },
                products: [
                    {
                        productId: 1,
                        id: 1,
                        name: "sdfsdf",
                        price: 100,
                        image: "string",
                        quantity: 1,
                        totalPrice: 100
                    },

                    {
                        productId: 1,
                        id: 1,
                        name: "sdfsdf",
                        price: 100,
                        image: "string",
                        quantity: 1,
                        totalPrice: 100
                    }, {
                        productId: 1,
                        id: 1,
                        name: "sdfsdf",
                        price: 100,
                        image: "string",
                        quantity: 1,
                        totalPrice: 100
                    },
                ]

            }
            return res.status(200).json(this._success("order success", send));
        } catch (e) {
          return  res.status(500).json(this._error("some error", { error: e instanceof Error? e.message:"some serer errro" }));
        }
    }


}