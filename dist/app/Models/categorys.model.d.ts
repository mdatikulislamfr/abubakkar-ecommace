import { Category } from "../../@types/table.js";
import { baseModel } from "./model.js";
export declare class CategoryModel extends baseModel {
    static tableName: string;
    static cacheInitialize(): Promise<void>;
    static clientresponce(cateogry: Category[]): {
        id: number;
        parent_id?: number | null;
        name: string;
        slug: string;
        sort_order: number;
        status: boolean;
        created_at: Date;
        updated_at: Date;
        deleted_at?: Date | null;
        image: string;
    }[];
}
//# sourceMappingURL=categorys.model.d.ts.map