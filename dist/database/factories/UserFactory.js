import { Factory } from "./Factory.js";
export class UserFactory extends Factory {
    definition() {
        const random = Math.random().toString(36).substring(2, 8);
        return {
            name: `User ${random}`,
            email: `user_${random}@example.com`,
            password: "password123"
        };
    }
}
//# sourceMappingURL=UserFactory.js.map