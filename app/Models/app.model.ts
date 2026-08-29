import { App } from "../../@types/table.js";
import appCache from "../cache/app.cache.js";
import { baseModel } from "./model.js";

export class AppModel extends baseModel {
    static tableName: string = "app";

    static async cachingOnModel() {
        if (!appCache.isInitialized()) {
            const app = await AppModel.table().first() as App;
            appCache.setAll([{ ...app, id: 0 }]);
        }

    }

}