import { Knex } from "knex";
import { App } from "../../@types/table.js";

export async function seed(knex: Knex): Promise<void> {
    await knex("app").del();
    const data: App = {
        id: 1,
        name: "SOFA COVER MARTE",
        title: "SCM - আপনাদের সেবায় বাংলাদেশের সেরা সোফা কভার।",
        logo: "app.",
        insite_dhaka: 70,
        outsite_dhaka: 120,
        email: "sofacovermart@gmail.com",
        location: "নদ্দা, ঢাকা-১২১২, বাংলাদেশ",
        phone: "+8801603495510",
        facebook: "https://facebook.com/ecommercebd",
        status: true,
        created_at: new Date(), // Required field
        updated_at: new Date()  // Required field
    };
    await knex("app").insert([data]);
}