import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("products", (table) => {
        table.bigIncrements("id").primary();
        table.bigInteger("category_id").unsigned().notNullable();
        table.bigInteger("brand_id").unsigned().nullable();
        table.string("name", 255).notNullable();
        table.string("slug", 255).notNullable().unique();
        table.string("sku", 100).notNullable().unique();
        table.text("title").nullable();
        table.text("description").nullable();
        table.string("unit", 50).notNullable().defaultTo("pcs");
        table.boolean("status").notNullable().defaultTo(true);
        table.boolean("reciveImages").notNullable().defaultTo(false).comment("for order time imaeg get or not");
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table
            .timestamp("updated_at")
            .notNullable()
            .defaultTo(knex.fn.now());
        table.timestamp("deleted_at").nullable();

        table
            .foreign("category_id")
            .references("id")
            .inTable("categories")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");

        table
            .foreign("brand_id")
            .references("id")
            .inTable("brands")
            .onDelete("SET NULL")
            .onUpdate("CASCADE");

        table.index(["category_id"]);
        table.index(["brand_id"]);
        table.index(["status"]);
        table.index(["slug"]);
        table.index(["created_at"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("products");
}