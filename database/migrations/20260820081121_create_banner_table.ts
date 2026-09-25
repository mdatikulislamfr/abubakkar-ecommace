import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("banners", (table) => {
        table.bigIncrements("id").primary();
        table.string("title", 255).notNullable();
        table.string("subtitle", 500).nullable();
        table.string("image", 500).notNullable();
        table.string("link", 500).nullable();
        table.integer("sort_order").defaultTo(0);
        table.tinyint("status").defaultTo(1);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());

        table.index(["status"]);
        table.index(["sort_order"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("banners");
}