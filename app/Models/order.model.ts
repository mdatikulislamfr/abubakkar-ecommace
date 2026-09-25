import { Order } from "../../@types/table.js";
import orderCache from "../cache/order.cache.js";
import { baseModel } from "./model.js";

export class OrderModel extends baseModel {

     static tableName: string = "orders";
     static primaryKey: string = "id";

     static join() {
          return this.table()
               .join(
                    "order_items",
                    "order_items.order_id",
                    "orders.id"
               )
               .select([
                    "orders.*",
                    "order_items.id as order_item_id",
                    "order_items.order_id",
                    "order_items.product_id",
                    "order_items.product_name",
                    "order_items.sku",
                    "order_items.quantity",
                    "order_items.unit_price",
                    "order_items.discount",
                    "order_items.discount_type",
                    "order_items.subtotal as item_subtotal",
                    "order_items.total as item_total",
               ])
               .whereNull("orders.deleted_at");
     }

     static groupOrders(rows: any[]): any[] {
          const grouped = new Map<number, any>();

          for (const row of rows) {
               const orderId = Number(row.id);

               if (!grouped.has(orderId)) {
                    grouped.set(orderId, {
                         id: row.id,
                         order_number: row.order_number,
                         customer_id: row.customer_id,
                         status: row.status,
                         payment_status: row.payment_status,
                         payment_method: row.payment_method,
                         subtotal: row.subtotal,
                         discount: row.discount,
                         total: row.total,
                         delivary_area: row.delivary_area,
                         delivary_charge: row.delivary_charge,
                         paid_amount: row.paid_amount,
                         due_amount: row.due_amount,
                         customer_name: row.customer_name,
                         customer_phone: row.customer_phone,
                         shipping_address: row.shipping_address,
                         customer_note: row.customer_note,
                         admin_note: row.admin_note,
                         ordered_at: row.ordered_at,
                         created_at: row.created_at,
                         updated_at: row.updated_at,
                         deleted_at: row.deleted_at,
                         products: []
                    });
               }

               grouped.get(orderId).products.push({
                    id: row.order_item_id,
                    order_id: row.order_id,
                    product_id: row.product_id,
                    product_name: row.product_name,
                    sku: row.sku,
                    quantity: row.quantity,
                    unit_price: row.unit_price,
                    discount: row.discount,
                    discount_type: row.discount_type,
                    subtotal: row.item_subtotal,
                    total: row.item_total,
                    created_at: row.item_created_at,
                    updated_at: row.item_updated_at
               });
          }

          return Array.from(grouped.values());
     }

     static async cacheInitialize() {
          try {
               if (!orderCache.isInitialized()) {
                    const res: Order[] = this.groupOrders(await this.join());
                    orderCache.setAll(res);
               }
          } catch (error) {
               throw (error instanceof Error ? error.message : "somer errror");
          }
     }

}