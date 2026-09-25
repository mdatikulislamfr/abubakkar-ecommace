import { Knex } from "knex";
import { Brand } from "../../@types/table.js";

export async function seed(knex: Knex): Promise<void> {
    // আগের সব ডেটা মুছে ফেলা হচ্ছে
    await knex("brands").del();

    const brands: Brand[] = [
        {
            id: 1,
            name: "Google",
            slug: "google",
            // উইকিমিডিয়া থেকে গুগলের অরিজিনাল লোগো
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            website: "https://www.google.com",
            status: true,
            sort_order: 1,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 2,
            name: "Microsoft",
            slug: "microsoft",
            // মাইক্রোসফটের অরিজিনাল লোগো
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
            website: "https://www.microsoft.com",
            status: true,
            sort_order: 2,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 3,
            name: "Amazon",
            slug: "amazon",
            // অ্যামাজনের অরিজিনাল লোগো
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            website: "https://www.amazon.com",
            status: true,
            sort_order: 3,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 4,
            name: "Apple",
            slug: "apple",
            // অ্যাপলের অরিজিনাল লোগো
            logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            website: "https://www.apple.com",
            status: true,
            sort_order: 4,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 5,
            name: "Nike",
            slug: "nike",
            // নাইকির অরিজিনাল লোগো
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
            website: "https://www.nike.com",
            status: true,
            sort_order: 5,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        }
    ];

    // brands টেবিলে ডেটা ইনসার্ট করা হলো
    await knex("brands").insert(brands);
}