import BaseCache from "./base.cache.js";
class OrderCache extends BaseCache {
    // order_number
    caseOrderNumber = new Map();
    // customer_phone
    casePhone = new Map();
    /**
     * Set all orders into cache
     */
    setAll(data) {
        super.setAll(data);
        this.caseOrderNumber.clear();
        this.casePhone.clear();
        data.forEach((order) => {
            if (order.customer_phone) {
                this.casePhone.set(order.customer_phone, order);
            }
        });
    }
    /**
     * Set single order
     */
    set(data) {
        super.set(data);
        if (data.customer_phone) {
            this.casePhone.set(data.customer_phone, data);
        }
    }
    /**
     * Get order by order number
     */
    getByOrderNumber(orderNumber) {
        return this.caseOrderNumber.get(orderNumber);
    }
    /**
     * Get order by customer phone
     */
    getByPhone(phone) {
        return this.casePhone.get(phone);
    }
    /**
     * Delete order
     */
    delete(id) {
        const order = this.get(id);
        if (order) {
            if (order.customer_phone) {
                this.casePhone.delete(order.customer_phone);
            }
        }
        return super.delete(id);
    }
    /**
     * Clear all order cache
     */
    clear() {
        super.clear();
        this.caseOrderNumber.clear();
        this.casePhone.clear();
    }
}
export default new OrderCache();
//# sourceMappingURL=order.cache.js.map