export async function seed(knex) {
    // আগের সব প্রোডাক্ট মুছে ফেলা হচ্ছে
    await knex("products").del();
    const prodcuts = [];
    // products টেবিলে ডেটা ইনসার্ট করা হলো
    await knex("products").insert(prodcuts);
}
//# sourceMappingURL=products.js.map