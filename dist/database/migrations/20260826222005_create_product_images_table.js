export async function up(knex) {
    await knex.schema.createTable("product_images", (table) => {
        table.bigIncrements("id").primary();
        table.bigInteger("product_id").unsigned().notNullable();
        table.string("image", 500).notNullable();
        table.string("for").defaultTo("product");
        table.integer("sort_order").unsigned().notNullable().defaultTo(0);
        table.boolean("is_primary").notNullable().defaultTo(false);
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
        table.index(["for"]);
        table.index(["product_id"]);
        table.index(["sort_order"]);
        table.index(["is_primary"]);
        table.index(["status"]);
        table.index(["created_at"]);
    });
}
export async function down(knex) {
    await knex.schema.dropTableIfExists("product_images");
}
//# sourceMappingURL=20260826222005_create_product_images_table.js.map