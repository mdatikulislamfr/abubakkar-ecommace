import type { Knex } from "knex";
const tableName: string = "product_variants";
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.bigIncrements("id").primary();
        table.bigInteger("product_id").unsigned().notNullable();
        table.string("size", 500).notNullable();
        table.integer("price").unsigned().notNullable().defaultTo(0);
        table.integer("old_price").notNullable().defaultTo(0);
        table.decimal("purchase_price", 12, 2).notNullable().defaultTo(0.00);
        table.integer("stock").unsigned().notNullable().defaultTo(0);
        table.integer("min_stock").unsigned().notNullable().defaultTo(0);
        table.decimal("discount", 12, 2).notNullable().defaultTo(0.00);

        table
            .enu("discount_type", ["fixed", "percent"])
            .notNullable()
            .defaultTo("fixed");
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
        table.index(["size"]);
        table.index(["price"]);
        table.index(["old_price"]);
        table.index(["stock"]);
        table.index(["created_at"]);
    });
}
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(tableName);
}