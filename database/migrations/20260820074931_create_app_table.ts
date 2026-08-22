import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("app", (table) => {
        table.bigIncrements("id").primary();
        table.string("name").notNullable();
        table.string("title").notNullable();
        table.decimal("insite_dhaka").unsigned().notNullable();
        table.decimal("outsite_dhaka").unsigned().notNullable();
        table.string("email").notNullable();
        table.string("location").notNullable();
        table.string("phone").notNullable();
        table.string("facebook").nullable();
        table.string("linkdin").nullable();
        table.string("logo").nullable();
        table.string("messager").nullable();
        table.string("youtube").nullable();
        table.boolean("status").notNullable().defaultTo(true);
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

        table.index(["id"]);

    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("app");
}