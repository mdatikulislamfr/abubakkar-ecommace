import { Knex } from "knex";
import { Product } from "../../@types/table.js";

export async function seed(knex: Knex): Promise<void> {
    // আগের সব প্রোডাক্ট মুছে ফেলা হচ্ছে
    await knex("products").del();
    const prodcuts: Product[] = [] 
    // products টেবিলে ডেটা ইনসার্ট করা হলো
    await knex("products").insert(prodcuts);
}