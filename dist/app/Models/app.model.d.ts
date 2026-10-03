import { AppInformation } from "../../@types/client.js";
import { App } from "../../@types/table.js";
import { baseModel } from "./model.js";
export declare class AppModel extends baseModel {
    static tableName: string;
    static emptydata: {
        name: string;
        title: string;
        logo: string;
        delivary: {
            insite: number;
            ousite: number;
        };
        contact: {
            phone: number;
            location: string;
            email: string;
        };
        facebook: string;
        youtube: string;
        linkdin: string;
        messager: string;
        id: number;
        status: boolean;
    };
    static cacheInitialize(): Promise<void>;
    static set(app: App): import("knex").Knex.QueryBuilder<any, number>;
    static responceDataModel(app: App): AppInformation;
}
//# sourceMappingURL=app.model.d.ts.map