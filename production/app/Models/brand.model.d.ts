import { Brand } from "../../@types/table.js";
import { baseModel } from "./model.js";
export declare class BrandModel extends baseModel {
    static tableName: string;
    static cacheInitialize(): Promise<void>;
    static clientresponce(brand: Brand[]): Brand[];
}
//# sourceMappingURL=brand.model.d.ts.map