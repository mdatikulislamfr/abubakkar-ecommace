import { AppInformation } from "../../@types/client.js";
import { App } from "../../@types/table.js";
import multer from "../../config/multer.js";
import appCache from "../cache/app.cache.js";
import { baseModel } from "./model.js";

export class AppModel extends baseModel {
    static tableName: string = "app";
    static emptydata = {
        name: "demo",
        title: "demo",
        logo: "demo",
        delivary: {
            insite: 0,
            ousite: 0
        },
        contact: {
            phone: 0,
            location: "demo,demo,bangladesh",
            email: "demo@gmail.com",
        },
        facebook: "string",
        youtube: "string",
        linkdin: "string",
        messager: "string",
        id: 1,
        status: false,
    }
    static async cacheInitialize() {
        if (!appCache.isInitialized()) {
            const app = await AppModel.table().select("*") as App[];
            if (app && app.length > 0) {
                appCache.setAll(app);
            }
        }
    }
    static set(app: App) {
        return AppModel.table().where("id", "=", app.id).update(app);
    }
    static responceDataModel(app: App): AppInformation {
        return {
            name: app.name || "",
            title: app.title || "",
            delivary: {
                insite: Number(app.insite_dhaka) || 0,
                ousite: Number(app.outsite_dhaka) || 0,
            },
            contact: {
                email: app.email || "",
                location: app.location || "",
                phone: app.phone || "",
            },
            facebook: app.facebook || "",
            linkdin: app.linkdin || "",
            logo: multer.path.public(`${app.logo}`),
            messager: app.messager || "",
            youtube: app.youtube || "",
            id: app.id,
            status: app.status
        }
    }
}