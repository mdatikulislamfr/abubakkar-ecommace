interface Order {
    name: string;
    phone: string;
    area: string;
    addresh: string;
    products: {
        name: string;
        size: string;
        quantity: number;
        price: number;
    }[];
    total: number;
}
export default function OrderTamplate(order: Order): string;
export {};
//# sourceMappingURL=OrderTamplate.d.ts.map