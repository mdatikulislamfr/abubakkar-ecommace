export interface ActivityLog {
    id: number;
    user_id: number | null;
    action: string;
    subject_type: string | null;
    subject_id: number | null;
    description: string | null;
    old_values: Record<string, unknown> | string | null;
    new_values: Record<string, unknown> | string | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: Date;
}
export interface Brand {
    id?: number;
    name: string;
    slug?: string;
    code?: string | null;
    description: string | null;
    logo?: string | null;
    website: string | null;
    status: boolean;
    sort_order: number;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
}
export interface Category {
    id?: number;
    parent_id?: number | null;
    name: string;
    slug?: string;
    description: string | null;
    image: string | null;
    sort_order?: number;
    status?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
}
export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    product_name: string;
    sku: string | null;
    quantity: number;
    unit_price: number;
    discount: number;
    discount_type: "fixed" | "percent";
    tax: number;
    subtotal: number;
    total: number;
    created_at: Date | string;
    updated_at: Date | string;
}
export interface Order {
    id: number;
    order_number: string;
    customer_id: number | null;
    status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
    payment_status:
    | "pending"
    | "partial"
    | "paid"
    | "failed"
    | "refunded";
    payment_method: string | null;
    subtotal: number;
    discount: number;
    shipping_charge: number;
    tax: number;
    total: number;
    paid_amount: number;
    due_amount: number;
    customer_name: string;
    customer_phone: string;
    shipping_address: string;
    billing_address: string | null;
    customer_note: string | null;
    admin_note: string | null;
    ordered_at: Date | string;
    created_at: Date | string;
    updated_at: Date | string;
    deleted_at: Date | string | null;
}
export interface ProductImage {
    id: number;
    product_id: number;
    image: string;
    alt: string | null;
    title: string | null;
    sort_order: number;
    is_primary: boolean;
    status: boolean;
    created_at: Date | string;
    updated_at: Date | string;
    deleted_at: Date | string | null;
}
export interface Product {
    id: number;
    category_id: number;
    brand_id: number | null;
    name: string;
    slug: string;
    sku: string;
    barcode: string | null;
    description: string | null;
    unit: string;
    purchase_price: number;
    sale_price: number;
    discount: number;
    discount_type: "fixed" | "percent";
    stock: number;
    min_stock: number;
    status: boolean;
    featured: boolean;
    created_at: Date | string;
    updated_at: Date | string;
    deleted_at: Date | string | null;
}

export interface Review {
    id: number;
    product_id: number;
    customer_id: number | null;
    order_id: number | null;
    order_item_id: number | null;
    rating: number;
    title: string | null;
    comment: string | null;
    status: "pending" | "approved" | "rejected";
    is_verified: boolean;
    admin_reply: string | null;
    replied_at: Date | string | null;
    created_at: Date | string;
    updated_at: Date | string;
    deleted_at: Date | string | null;
}
export interface ProductStock {
    id: number;
    product_id: number;
    warehouse_id: number | null;
    quantity: number;
    reserved_quantity: number;
    available_quantity: number;
    min_stock: number;
    max_stock: number;
    reorder_level: number;
    created_at: Date | string;
    updated_at: Date | string;
}