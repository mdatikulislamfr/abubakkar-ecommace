import { Order } from "../../@types/table.js";
import { baseModel } from "./model.js";
export declare class OrderModel extends baseModel {
    static tableName: string;
    static primaryKey: string;
    static join(): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: string;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    } | {
        _base: any;
        _hasSelection: true;
        _keys: string;
        _aliases: {};
        _single: boolean;
        _intersectProps: {};
        _unionProps: unknown;
    }>;
    static groupOrders(rows: any[]): any[];
    static cacheInitialize(): Promise<void>;
    static clientResponce(orders: Order[]): Promise<{
        id: number;
        random_id: string;
        status: "cancelled" | "confirmed" | "delivered" | "pending" | "processing" | "returned" | "shipped";
        payment_status: "failed" | "paid" | "partial" | "pending" | "refunded";
        payment_method: string | null | undefined;
        delivary_area: "inside" | "outside";
        delivary_charge: number;
        image: string;
        discount: number;
        subtotal: number;
        total: number;
        customer_name: string;
        customer_phone: string;
        customer_address: string;
        customer_note: string | null | undefined;
        admin_note: string | null | undefined;
        ordered_at: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
}
//# sourceMappingURL=order.model.d.ts.map