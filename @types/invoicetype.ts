// 1. Invoice Status Type
export type InvoiceStatus =
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
export interface InvoiceItem {
    id: string;
    description: string;
    project?: string;
    rate: number;
    quantity: number;
    amount: number;
}

export interface ClientInfo {
    name: string;
    email: string;
    companyName?: string;
    address?: string;
    city?: string;
    country?: string;
    zipCode?: string;
}

export interface BillerInfo {
    name: string;
    title?: string;
    email: string;
    address?: string;
}

export interface Invoice {
    id: string;
    issueDate: string;
    dueDate: string;
    biller: BillerInfo;
    client: ClientInfo;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    discount?: number;
    total: number;
    status: InvoiceStatus;
    terms?: string;
    notes?: string;
    InvoiceSummary: InvoiceSummary
}

export interface InvoiceSummary {
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    totalCount: number;
}