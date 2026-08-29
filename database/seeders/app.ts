import { Knex } from "knex";
export async function seed(knex: Knex): Promise<void> {
    await knex("app").del();
    await knex("app").insert({
        "name": "টাইমবাজ",
        "title": "টাইমবাজ - আপনার সময়, আপনার স্টাইল",
        "insite_dhaka": 70,
        "outsite_dhaka": 120,
        "email": "support@timebaj.com",
        "location": "মিরপুর, ঢাকা, বাংলাদেশ",
        "phone": "+8801700000000",
        "facebook": "https://facebook.com/timebaj",
        "linkdin": "https://linkedin.com/company/timebaj",
        "logo": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",
        "status": true,
        "messager": "https://m.me/timebaj",
        "youtube": "https://youtube.com/@timebaj"
    })
}