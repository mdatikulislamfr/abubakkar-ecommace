import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("product_stocks", (table) => {
        table.bigIncrements("id").primary();

        table.bigInteger("product_id").unsigned().notNullable();
        table.bigInteger("warehouse_id").unsigned().nullable();

        table.decimal("quantity", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("reserved_quantity", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("available_quantity", 12, 2).notNullable().defaultTo(0.00);

        table.decimal("min_stock", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("max_stock", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("reorder_level", 12, 2).notNullable().defaultTo(0.00);

        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

        table
            .timestamp("updated_at")
            .notNullable()
            .defaultTo(knex.fn.now());

        table.unique(["product_id", "warehouse_id"]);

        table
            .foreign("product_id")
            .references("id")
            .inTable("products")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

        table
            .foreign("warehouse_id")
            .references("id")
            .inTable("warehouses")
            .onDelete("SET NULL")
            .onUpdate("CASCADE");

        table.index(["product_id"]);
        table.index(["warehouse_id"]);
        table.index(["quantity"]);
        table.index(["available_quantity"]);
        table.index(["reorder_level"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("product_stocks");
}