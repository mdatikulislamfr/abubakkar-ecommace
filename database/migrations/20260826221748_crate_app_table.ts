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

    // demo data on table
    await knex("app").insert({
        name: "ফ্যামিলি শপ",
        title: "ফ্যামিলি শপ - আপনার বিশ্বস্ত অনলাইন শপিং",
        insite_dhaka: 60,
        outsite_dhaka: 120,
        email: "support@familyshop.com",
        location: "মিরপুর, ঢাকা, বাংলাদেশ",
        phone: "+8801700000000",
        facebook: "https://facebook.com/familyshop",
        linkdin: "https://linkedin.com/company/familyshop",
        logo: "https://example.com/uploads/logo.png",
        status: true,
        messager: "https://m.me/familyshop",
        youtube: "https://youtube.com/@familyshop"
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("app");
}