import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("reviews", (table) => {
        table.bigIncrements("id").primary();

        table.bigInteger("product_id").unsigned().notNullable();
        table.bigInteger("customer_id").unsigned().nullable();
        table.bigInteger("order_id").unsigned().nullable();
        table.bigInteger("order_item_id").unsigned().nullable();

        table
            .tinyint("rating")
            .unsigned()
            .notNullable();

        table.string("title", 255).nullable();
        table.text("comment").nullable();

        table
            .enu("status", ["pending", "approved", "rejected"])
            .notNullable()
            .defaultTo("pending");

        table.boolean("is_verified").notNullable().defaultTo(false);

        table.text("admin_reply").nullable();
        table.timestamp("replied_at").nullable();

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


        table
            .foreign("order_id")
            .references("id")
            .inTable("orders")
            .onDelete("SET NULL")
            .onUpdate("CASCADE");

        table
            .foreign("order_item_id")
            .references("id")
            .inTable("order_items")
            .onDelete("SET NULL")
            .onUpdate("CASCADE");

        table.index(["product_id"]);
        table.index(["customer_id"]);
        table.index(["order_id"]);
        table.index(["order_item_id"]);
        table.index(["rating"]);
        table.index(["status"]);
        table.index(["is_verified"]);
        table.index(["created_at"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("reviews");
}