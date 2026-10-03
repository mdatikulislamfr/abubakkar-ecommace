import { Order } from "../../@types/table.js";
import BaseCache from "./base.cache.js";
declare class OrderCache extends BaseCache<Order> {
    protected caseOrderNumber: Map<string, Order>;
    protected casePhone: Map<string, Order>;
    /**
     * Set all orders into cache
     */
    setAll(data: Order[]): void;
    /**
     * Set single order
     */
    set(data: Order): void;
    /**
     * Get order by order number
     */
    getByOrderNumber(orderNumber: string): Order | undefined;
    /**
     * Get order by customer phone
     */
    getByPhone(phone: string): Order | undefined;
    /**
     * Delete order
     */
    delete(id: number): boolean;
    /**
     * Clear all order cache
     */
    clear(): void;
}
declare const _default: OrderCache;
export default _default;
//# sourceMappingURL=order.cache.d.ts.map