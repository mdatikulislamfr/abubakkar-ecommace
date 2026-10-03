import { baseModel } from "./model.js";
export class OrderItemModel extends baseModel {
    static tableName = "order_items";
    static primaryKey = "id";
    static cacheInitialize() {
    }
}
//# sourceMappingURL=orderItem.model.js.map