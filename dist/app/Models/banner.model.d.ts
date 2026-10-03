import { Slider } from "../../@types/client.js";
import { Banner } from "../../@types/table.js";
import { baseModel } from "./model.js";
export declare class BannerModel extends baseModel {
    static tableName: string;
    static cacheInitialize(): Promise<void>;
    static responceDataModel(banners: Banner[]): Slider[];
}
//# sourceMappingURL=banner.model.d.ts.map