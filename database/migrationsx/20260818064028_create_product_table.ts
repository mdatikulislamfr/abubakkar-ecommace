import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("products", (table) => {
        table.bigIncrements("id").primary();

        table.bigInteger("category_id").unsigned().notNullable();
        table.bigInteger("brand_id").unsigned().nullable();

        table.string("name", 255).notNullable();
        table.string("slug", 255).notNullable().unique();
        table.string("sku", 100).notNullable().unique();
        table.string("barcode", 100).nullable().unique();

        table.text("description").nullable();

        table.string("unit", 50).notNullable().defaultTo("pcs");

        table.decimal("purchase_price", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("sale_price", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("discount", 12, 2).notNullable().defaultTo(0.00);

        table
            .enu("discount_type", ["fixed", "percent"])
            .notNullable()
            .defaultTo("fixed");

        table.decimal("stock", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("min_stock", 12, 2).notNullable().defaultTo(0.00);

        table.boolean("status").notNullable().defaultTo(true);
        table.boolean("featured").notNullable().defaultTo(false);

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
        table.index(["featured"]);
        table.index(["created_at"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("products");
}