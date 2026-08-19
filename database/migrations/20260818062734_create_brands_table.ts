import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("brands", (table) => {

        // Primary key
        table.bigIncrements("id").primary();

        // Brand name
        table.string("name", 150).notNullable();

        // URL-friendly unique name
        table.string("slug", 180).notNullable().unique();

        // Brand unique code
        table.string("code", 50).nullable().unique();

        // Brand description
        table.text("description").nullable();

        // Brand logo path / URL
        table.string("logo", 500).nullable();

        // Official website
        table.string("website", 500).nullable();

        // Active / Inactive
        // 1 = Active, 0 = Inactive
        table.boolean("status").notNullable().defaultTo(true);

        // Display order
        table.integer("sort_order").notNullable().defaultTo(0);

        // Created time
        table.timestamp("created_at").defaultTo(knex.fn.now());

        // Updated time
        table.timestamp("updated_at")
            .defaultTo(knex.fn.now());

        // Soft delete
        table.timestamp("deleted_at").nullable();

        // Indexes
        table.index(["status"]);
        table.index(["sort_order"]);
        table.index(["created_at"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("brands");
}