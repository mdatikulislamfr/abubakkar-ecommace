import { AppModel } from "../Models/app.model.js";
export async function deliveryHelper(text) {
    const app = await AppModel.table().first();
    if (text === "inside") {
        return {
            charage: app.insite_dhaka || 0,
            where: "ঢাকার ভিতরে"
        };
    }
    return {
        charage: app.outsite_dhaka || 0,
        where: "ঢাকার বাইরে"
    };
}
//# sourceMappingURL=delivaryHelper.js.map