export async function up(knex) {
    await knex.schema.createTable("order_items", (table) => {
        table.bigIncrements("id").primary();
        table.bigInteger("order_id").unsigned().notNullable();
        table.bigInteger("product_id").unsigned().notNullable();
        table.string("product_name", 255).notNullable();
        table.string("sku", 100).nullable();
        table.decimal("quantity", 12, 2).notNullable().defaultTo(1.00);
        table.decimal("unit_price", 12, 2).notNullable().defaultTo(0.00);
        table.string("unit", 50).notNullable().defaultTo("pcs");
        table.decimal("discount", 12, 2).notNullable().defaultTo(0.00);
        table
            .enu("discount_type", ["fixed", "percent"])
            .notNullable()
            .defaultTo("fixed");
        table.decimal("subtotal", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("total", 12, 2).notNullable().defaultTo(0.00);
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table
            .foreign("order_id")
            .references("id")
            .inTable("orders")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        table
            .foreign("product_id")
            .references("id")
            .inTable("products")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        table.index(["order_id"]);
        table.index(["product_id"]);
    });
}
export async function down(knex) {
    await knex.schema.dropTableIfExists("order_items");
}
//# sourceMappingURL=20260826222112_crate_order_items_table.js.map