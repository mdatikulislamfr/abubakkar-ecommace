export async function up(knex) {
    await knex.schema.createTable("orders", (table) => {
        table.bigIncrements("id").primary();
        table.string("random_id", 100).notNullable().unique();
        table
            .enu("status", [
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
            "returned",
        ])
            .notNullable()
            .defaultTo("pending");
        table
            .enu("payment_status", [
            "pending",
            "partial",
            "paid",
            "failed",
            "refunded",
        ])
            .notNullable()
            .defaultTo("pending");
        table.string("payment_method", 50).nullable();
        table.enum("delivary_area", ["inside", "outside"])
            .comment("dhaka inside or outside");
        table.decimal("delivary_charge", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("discount", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("subtotal", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("total", 12, 2).notNullable().defaultTo(0.00);
        // customar information
        table.string("customer_name", 150).notNullable();
        table.string("customer_phone", 30).notNullable();
        table.text("customer_address").notNullable();
        table.text("customer_note").nullable();
        table.text("admin_note").nullable();
        table.timestamp("ordered_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table
            .timestamp("updated_at")
            .notNullable()
            .defaultTo(knex.fn.now());
        table.timestamp("deleted_at").nullable();
        // index
        table.index(["status"]);
        table.index(["payment_status"]);
        table.index(["ordered_at"]);
        table.index(["created_at"]);
    });
}
export async function down(knex) {
    await knex.schema.dropTableIfExists("orders");
}
//# sourceMappingURL=20260826222051_crate_order_table.js.map