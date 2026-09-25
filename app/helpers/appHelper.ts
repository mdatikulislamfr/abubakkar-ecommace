import { nanoid } from 'nanoid'
import { ResponceType } from '../../@types/index.js';

/* ------------------ helpers ------------------ */
const randomItem = (arr: string[] | number[]) => arr[Math.floor(Math.random() * arr.length)];
const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

/* ------------------ IDs ------------------ */
const fakeId = (len: number = 12) => nanoid(len);

/* ------------------ Email & Password ------------------ */
const fakeEmail = (prefix = nanoid(8).toLowerCase()) => `${prefix}@gmail.com`;

const fakePassword = () => nanoid(8) + randomNumber(100, 999);

/* ------------------ Names ------------------ */
const firstNames = [
    "Muhammad", "Ahmad", "Ali", "Hasan", "Husain", "Abdullah",
    "Abdur Rahman", "Omar", "Umar", "Yusuf", "Ibrahim", "Ismail",
    "Musa", "Isa", "Nuh", "Sulaiman", "Khalid", "Bilal", "Hamza",
    "Zayd", "Anas"
];

const lastNames = [
    "Siddiqi", "Farooqi", "Usmani", "Madani", "Nadvi",
    "Hussaini", "Rizvi", "Chishti", "Qadri", "Naqshbandi"
];

const fakeName = () =>
    `${randomItem(firstNames)} ${randomItem(lastNames)}`;

/* ------------------ Phone ------------------ */
const fakePhone = () =>
    `01${randomItem([3, 4, 5, 6, 7, 8, 9])}${randomNumber(10000000, 99999999)}`;

/* ------------------ Address ------------------ */
const cities = [
    "Dhaka", "Chittagong", "Sylhet", "Rajshahi",
    "Khulna", "Barishal", "Rangpur", "Mymensingh"
];

const fakeAddress = () => ({
    country: "Bangladesh",
    city: randomItem(cities),
    area: "Local Area",
    zip: randomNumber(1000, 9999)
});

/* ------------------ Role & Status ------------------ */
const fakeRole = () => randomItem(["admin", "user", "manager"]);
const fakeStatus = () => randomItem(["active", "inactive", "blocked"]);
/* ------------------ User Generator ------------------ */
const fakeUser = <T>(custom?: T): T => (custom || {
    id: fakeId(),
    name: fakeName(),
    email: fakeEmail(),
    phone: fakePhone(),
    password: fakePassword(),
    role: fakeRole(),
    status: fakeStatus(),
    address: fakeAddress(),
    avatar: `https://i.pravatar.cc/150?u=${nanoid(5)}`,
    created_at: new Date().toISOString(),
} as T);

/* ------------------ Multiple Users ------------------ */
const fakeUsers = (count = 10, override = {}) =>
    Array.from({ length: count }, () => fakeUser(override));

function _error<T>(data: ResponceType<T>): ResponceType<T> {
    return { error: true, message: data.message, data: data.data }
}
function _success<T>(data: ResponceType<T>): ResponceType<T> {
    return { error: false, message: data.message, data: data.data }
}
function empty<T>(value: T): boolean {
    if (value === null || value === undefined) {
        return true;
    }
    if (typeof value === "string") {
        return value.trim() === "";
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    return false;
}



/* ------------------ Export ------------------ */
export {
    empty,
    fakeId,
    fakeEmail,
    fakePassword,
    fakeName,
    fakePhone,
    fakeAddress,
    fakeUser,
    fakeUsers,
    randomItem,
    randomNumber,
    _error,
    _success
};
