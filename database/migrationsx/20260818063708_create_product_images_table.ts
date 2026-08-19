import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("product_images", (table) => {
        table.bigIncrements("id").primary();
        table.bigInteger("product_id").unsigned().notNullable();

        table.string("image", 500).notNullable();
        table.string("alt", 255).nullable();
        table.string("title", 255).nullable();

        table.integer("sort_order").unsigned().notNullable().defaultTo(0);
        table.boolean("is_primary").notNullable().defaultTo(false);
        table.boolean("status").notNullable().defaultTo(true);
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table
            .timestamp("updated_at")
            .notNullable()
            .defaultTo(knex.fn.now());

        table.timestamp("deleted_at").nullable();

        table
            .foreign("product_id")
            .references("id")
            .inTable("products")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

        table.index(["product_id"]);
        table.index(["sort_order"]);
        table.index(["is_primary"]);
        table.index(["status"]);
        table.index(["created_at"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("product_images");
}