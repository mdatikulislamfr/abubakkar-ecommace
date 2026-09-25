export interface ActivityLog {
    id: number;
    user_id?: number | null;
    action: string;
    subject_type?: string | null;
    subject_id?: number | null;
    description?: string | null;
    old_values?: Record<string, unknown> | null;
    new_values?: Record<string, unknown> | null;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: Date;
}
export interface Banner {
    id: number;
    title: string;
    subtitle?: string | null;
    image: string;
    link?: string | null;
    sort_order?: number;
    status?: number;
    created_at?: Date;
    updated_at?: Date;
}
export interface App {
    id: number;
    name: string;
    title: string;
    logo?: string | null;
    insite_dhaka: number;
    outsite_dhaka: number;
    email: string;
    location: string;
    phone: string;
    facebook?: string | null;
    linkdin?: string | null;
    messager?: string | null;
    youtube?: string | null;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}
export interface Category {
    id: number;
    parent_id?: number | null;
    name: string;
    slug: string;
    image?: string | null;
    sort_order: number;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
}
export interface Brand {
    id: number;
    name: string;
    slug: string;
    logo?: string | null;
    website?: string | null;
    status: boolean;
    sort_order: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}
// product section------------
export interface Product {
    id: number;
    category_id: number;
    brand_id: number | null;
    name: string;
    slug: string;
    sku: string;
    title: string | null;
    description: string | null;
    unit: string;
    status: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
    // others
    brand_name?: string | null,
    categorie_name?: string | null,
    reciveImages?: boolean | null,
}
export interface ProductVariant {
    id?: number;
    product_id: number;
    size: string;
    price: number;
    old_price: number;
    purchase_price: number;
    stock: number;
    min_stock: number;
    discount: number;
    discount_type: 'fixed' | 'percent';
    status: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}
export interface ProductImage {
    id: number;
    product_id: number;
    image: string;
    for: "product" | "category" | "banner" | "brand";
    sort_order: number;
    is_primary: boolean;
    status: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}
// prodcut sesction end
export interface Order {
    id: number;
    random_id: string;
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
    payment_method?: string | null;
    delivary_area: "inside" | "outside";
    delivary_charge: number;
    discount: number;
    subtotal: number;
    total: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_note?: string | null;
    admin_note?: string | null;
    ordered_at: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
}
export interface OrderCustomerDetails {
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_note?: string | null;
    payment_method?: string | null;
    delivary_area: "inside" | "outside";
    delivary_charge: number;
    discount: number;
    subtotal: number;
    total: number;
}
export interface OrderItem {
    id?: number;
    order_id?: number;
    product_id: number;
    product_name: string;
    sku?: string | null;
    quantity: number;
    unit_price: number;
    unit: string;
    discount: number;
    discount_type: "fixed" | "percent";
    subtotal: number;
    total: number;
    created_at?: Date;
    updated_at?: Date;
}