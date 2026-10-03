import Controller from "./Controller.js";
import STATUS from "../../../config/status.js";
import TeligramNotify from "../../Jobs/TeligramNotify.js";
import OrderTamplate from "../../tamplate/OrderTamplate.js";
const order = {
    id: `#1231`,
    name: "আব্দুল্লাহ",
    phone: "01712345678",
    addresh: "মিরপুর-১০, ঢাকা",
    area: "ঢাকা",
    products: [
        {
            name: "Premium Sofa Cover",
            size: "7 Seater",
            quantity: 2,
            price: 850,
        },
        {
            name: "Cushion Cover",
            size: "Large",
            quantity: 2,
            price: 250,
        },
    ],
    total: 2100,
};
export default new class TestController extends Controller {
    test = (_req, res) => {
        const template = OrderTamplate(order);
        TeligramNotify({
            html: true,
            text: template,
            atr: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "📞",
                                copy_text: {
                                    text: order.phone,
                                },
                            },
                            // {
                            //     text: "✅",
                            //     callback_data: `confirm_${order.id}`,
                            // },
                            // {
                            //     text: "❌",
                            //     callback_data: `cancel_${order.id}`,
                            // },
                        ],
                    ],
                },
            }
        });
        return res._success(STATUS.OK, "OK");
    };
};
//# sourceMappingURL=Test.Controller.js.map