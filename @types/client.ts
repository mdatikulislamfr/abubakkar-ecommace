// application
export interface AppInformation {
    name: string;
    title: string;
    logo?: string;
    delivary: {
        insite: number,
        ousite: number
    }
    contact: {
        phone: string;
        location: string;
        email: string;
    };
    facebook?: string;
    youtube?: string;
    linkdin?: string;
    messager?: string;
    id: number;
    status: boolean;
}
// product categorys
export interface Category {
    id: number;
    parent_id?: number,
    parent_name?: string,
    name: string;
    slug: string;
    image: string;
}
// invoice
export interface Invoice {
    id: number,
    randomId: string,
    customar: {
        name: string,
        address: string,
        contact: string,
        comment: string,
    },
    invoiceDate: string,
    paymentTerms: string,
    products: {
        name: string,
        quantity: string,
        description: string,
        unitPrice: string,
        discount: string,
        subTotal: string,
        total: string,
    }[],
    subTotal: string,
    discount: string,
    delivaryCharge: string,
    total: string

}
// order
export interface OrderItem {
    productId: number,
    quantity: number,
}
export interface Order {
    randomId?: string,
    name: string,
    contact: string,
    comment?: string,
    delivary_area: string;
    address: string,
    products: OrderItem[]
}
// product
export interface ProductVariantDataClient {
    id: number;
    size: string;
    price: number;
    oldPrice: number;
    stock: number;
    isAvailable: boolean;
}

export interface ProductDataClient {
    id: number;
    slug: string;
    name: string;
    description: string;
    longDescription: string[];
    price: number;
    oldPrice: number;
    discount: number;
    discountType: 'fixed' | 'percent';
    categoryId: number;
    categoryName: string;
    images: string[];
    brandId: number;
    brandName: string;
    hasVariants: boolean;
    reciveImages: boolean;
    variants: ProductVariantDataClient[];
}
// slider
export interface Slider {
    id: number,
    title: string;
    subTitle: string;
    link: string;
    image: string;
    status: number,
    sort_order: number
}