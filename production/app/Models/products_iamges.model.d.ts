import { ProductImage } from "../../@types/table.js";
import { baseModel } from "./model.js";
export declare class ProductImagesModel extends baseModel {
    static tableName: string;
    static primaryKey: string;
    static cacheInitialize(): Promise<void>;
    static create(images: ProductImage | ProductImage[]): Promise<number[]>;
}
//# sourceMappingURL=products_iamges.model.d.ts.map