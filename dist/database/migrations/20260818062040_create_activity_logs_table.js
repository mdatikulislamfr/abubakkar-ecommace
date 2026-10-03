export async function up(knex) {
    await knex.schema.createTable("activity_logs", (table) => {
        // Primary Key
        table.bigIncrements("id").primary();
        // কে action করেছে
        table.bigInteger("user_id").unsigned().nullable();
        // কী action হয়েছে
        // Example: created, updated, deleted, login, logout
        table.string("action", 100).notNullable();
        // কোন ধরনের record-এর উপর action হয়েছে
        // Example: Product, Order, Customer
        table.string("subject_type", 100).nullable();
        // কোন record-এর উপর action হয়েছে
        table.bigInteger("subject_id").unsigned().nullable();
        // Action-এর বিস্তারিত description
        table.text("description").nullable();
        // Action-এর আগের data
        table.json("old_values").nullable();
        // Action-এর পরের data
        table.json("new_values").nullable();
        // User-এর IP address
        table.string("ip_address", 45).nullable();
        // Browser / Device information
        table.text("user_agent").nullable();
        // কখন action হয়েছে
        table.timestamp("created_at").defaultTo(knex.fn.now());
        // Indexes
        table.index(["user_id"]);
        table.index(["subject_type", "subject_id"]);
        table.index(["action"]);
        table.index(["created_at"]);
    });
}
export async function down(knex) {
    await knex.schema.dropTableIfExists("activity_logs");
}
//# sourceMappingURL=20260818062040_create_activity_logs_table.js.map