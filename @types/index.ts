import { Request, Response } from "express";

// reponce type
export interface ResponceType<T> {
    error?: boolean,
    message: string,
    data?: T
}

// custom request 
export interface Req<T> extends Request {
    user?: {
        name?: string,
        id: number,
        token: string
    },
    body: T

}
export interface Res extends Response {
    name?: string,
};


// applicaont type

// order inputs
export interface OrderInformation {
    id?: number,
    name: string;
    tel: string;
    address: string;
    area: string;
    comment?: string;
}