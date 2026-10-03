export async function up(knex) {
    await knex.schema.createTable("categories", (table) => {
        table.bigIncrements("id").primary();
        table.bigInteger("parent_id").unsigned().nullable();
        table.string("name", 150).notNullable();
        table.string("slug", 180).notNullable().unique();
        table.string("image", 500).nullable();
        table.integer("sort_order").unsigned().notNullable().defaultTo(0);
        table.boolean("status").notNullable().defaultTo(true);
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("deleted_at").nullable();
        table
            .foreign("parent_id")
            .references("id")
            .inTable("categories")
            .onDelete("SET NULL")
            .onUpdate("CASCADE");
        table.index(["parent_id"]);
        table.index(["status"]);
        table.index(["sort_order"]);
    });
}
export async function down(knex) {
    await knex.schema.dropTableIfExists("categories");
}
//# sourceMappingURL=20260826221828_crate_categories_table.js.map