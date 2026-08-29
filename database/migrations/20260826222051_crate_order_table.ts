import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("orders", (table) => {
        table.bigIncrements("id").primary();
        table.string("order_number", 100).notNullable().unique();
        table.bigInteger("customer_id").unsigned().nullable();
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
        table.enum("delivary_area",
            ["inside", "outside"])
            .comment("dhaka inside or outside");
        table.decimal("delivary_charge", 12, 2).notNullable().defaultTo(0.00)
        
        table.decimal("subtotal", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("discount", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("total", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("paid_amount", 12, 2).notNullable().defaultTo(0.00);
        table.decimal("due_amount", 12, 2).notNullable().defaultTo(0.00);
        table.string("customer_name", 150).notNullable();
        table.string("customer_phone", 30).notNullable();
        table.text("shipping_address").notNullable();
        table.text("billing_address").nullable();
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
        table.index(["customer_id"]);
        table.index(["status"]);
        table.index(["payment_status"]);
        table.index(["ordered_at"]);
        table.index(["created_at"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("orders");
}