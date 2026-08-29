import { Knex } from "knex";
import product from '../../app/data/product.json' with  {type: "json"}
export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();
    await knex("products").insert(product)

}