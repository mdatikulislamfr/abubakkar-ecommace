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