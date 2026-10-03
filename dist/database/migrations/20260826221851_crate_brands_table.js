export async function up(knex) {
    await knex.schema.createTable("brands", (table) => {
        // Primary key
        table.bigIncrements("id").primary();
        // Brand name
        table.string("name", 150).notNullable();
        // URL-friendly unique name
        table.string("slug", 180).notNullable().unique();
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
    });
}
export async function down(knex) {
    await knex.schema.dropTableIfExists("brands");
}
//# sourceMappingURL=20260826221851_crate_brands_table.js.map