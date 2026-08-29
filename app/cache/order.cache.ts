
import { Order } from "../../@types/table.js";
import BaseCache from "./base.cache.js";

class OrderCache extends BaseCache<Order> {

    // order_number
    protected caseOrderNumber = new Map<string, Order>();
    // customer_phone
    protected casePhone = new Map<string, Order>();

    /**
     * Set all orders into cache
     */
    setAll(data: Order[]): void {
        super.setAll(data);
        this.caseOrderNumber.clear();
        this.casePhone.clear();
        data.forEach((order) => {

            if (order.order_number) {
                this.caseOrderNumber.set(
                    order.order_number,
                    order
                );
            }

            if (order.customer_phone) {
                this.casePhone.set(
                    order.customer_phone,
                    order
                );
            }

        });
    }

    /**
     * Set single order
     */
    set(data: Order): void {
        super.set(data);
        if (data.order_number) {
            this.caseOrderNumber.set(
                data.order_number,
                data
            );
        }
        if (data.customer_phone) {
            this.casePhone.set(
                data.customer_phone,
                data
            );
        }
    }

    /**
     * Get order by order number
     */
    getByOrderNumber(orderNumber: string): Order | undefined {
        return this.caseOrderNumber.get(orderNumber);
    }

    /**
     * Get order by customer phone
     */
    getByPhone(phone: string): Order | undefined {
        return this.casePhone.get(phone);
    }

    /**
     * Delete order
     */
    delete(id: number): boolean {

        const order = this.get(id);

        if (order) {

            if (order.order_number) {
                this.caseOrderNumber.delete(
                    order.order_number
                );
            }

            if (order.customer_phone) {
                this.casePhone.delete(
                    order.customer_phone
                );
            }
        }

        return super.delete(id);
    }

    /**
     * Clear all order cache
     */
    clear(): void {

        super.clear();

        this.caseOrderNumber.clear();
        this.casePhone.clear();
    }
}

export default new OrderCache();