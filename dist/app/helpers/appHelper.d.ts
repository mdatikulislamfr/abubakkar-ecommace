import { ResponceType } from '../../@types/index.js';
declare const randomItem: (arr: string[] | number[]) => string | number;
declare const randomNumber: (min: number, max: number) => number;
declare const fakeId: (len?: number) => string;
declare const fakeEmail: (prefix?: string) => string;
declare const fakePassword: () => string;
declare const fakeName: () => string;
declare const fakePhone: () => string;
declare const fakeAddress: () => {
    country: string;
    city: string | number;
    area: string;
    zip: number;
};
declare const fakeUser: <T>(custom?: T) => T;
declare const fakeUsers: (count?: number, override?: {}) => {}[];
declare function _error<T>(data: ResponceType<T>): ResponceType<T>;
declare function _success<T>(data: ResponceType<T>): ResponceType<T>;
declare function empty<T>(value: T): boolean;
export { empty, fakeId, fakeEmail, fakePassword, fakeName, fakePhone, fakeAddress, fakeUser, fakeUsers, randomItem, randomNumber, _error, _success };
//# sourceMappingURL=appHelper.d.ts.map