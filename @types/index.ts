// reponce type
export interface ResponceType<T> {
    error?: boolean,
    message: string,
    data?: T
}
// order inputs
export interface OrderInformation {
    id?: number,
    name: string;
    tel: string;
    address: string;
    area: string;
    comment?: string;
}
// reponce product
export interface ProductReponce {
    id: number;
    slug: string;
    name: string;
    description: string;
    specification: string[];
    price: number;
    oldPrice?: number;
    discount?: number;
    categoryId: number;
    categoryName: string;
    images: string[];
    rating: number;
    reviewCount: number;
    stock: number;
    brand?: string;
    featured?: boolean;
    bestSelling?: boolean;
    newArrival?: boolean;
    createdAt: string;
}

// order request user
export interface OrderProduct {
    id: string,
    title?: string,
    subTitle?: string,
    unityPrice?: number,
    unityType?: string,
    quantity: string,
    totalPrice?: number,
}
export interface OrderRequest {
    id: number,
    customer_name: string,
    customer_note: string,
    customer_phone: string,
    shipping_address: string,
    delivary_area: "inside" | "outside",
    admin_note?: string,
    products: OrderProduct[]

}