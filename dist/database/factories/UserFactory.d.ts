import { Factory } from "./Factory.js";
export interface UserFactoryData {
    name: string;
    email: string;
    password: string;
}
export declare class UserFactory extends Factory<UserFactoryData> {
    definition(): UserFactoryData;
}
//# sourceMappingURL=UserFactory.d.ts.map