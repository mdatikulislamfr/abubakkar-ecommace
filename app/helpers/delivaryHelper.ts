import { App } from "../../@types/table.js"
import { AppModel } from "../Models/app.model.js"

export async function deliveryHelper(text: "inside" | "outside" | string): Promise<{ where: string; charage: number; }> {
    const app = await AppModel.table().first() as App;
    if (text === "inside") {
        return {
            charage: app.insite_dhaka || 0,
            where: "ঢাকার ভিতরে"
        }
    }
    return {
        charage: app.outsite_dhaka || 0,
        where: "ঢাকার বাইরে"
    }
}
