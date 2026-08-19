import { OrderInformation, Req, Res } from "../../../@types/index.js";
import Controller from "./Controller.js";


export default new class OrdersController extends Controller {
    order = (req: Req<OrderInformation>, res: Res) => {
        try {
            const { name, address, area, tel, comment, id } = req.body;
            if (name || address || area || tel || comment || id) {
                return null;
            }
            return res.status(200).json(this._success("order success", {
                id: 1
            }));
        } catch (e) {
            return res.status(500).json(this._error("some error", { error: e.message }));
        }
    }
    invoice = (req, res) => {
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
            res.status(500).json(this._error("some error", { error: e.message }));
        }
    }


}