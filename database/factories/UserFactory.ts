import { Factory } from "./Factory.js";

export interface UserFactoryData {
    name: string;
    email: string;
    password: string;
}

export class UserFactory extends Factory<UserFactoryData> {

    definition(): UserFactoryData {
        const random = Math.random().toString(36).substring(2, 8);
        return {
            name: `User ${random}`,
            email: `user_${random}@example.com`,
            password: "password123"
        };
    }
}