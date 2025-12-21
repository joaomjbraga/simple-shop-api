import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("loja", (table) => {
    table.increments("id").primary();
    table.text("products").notNullable();
    table.timestamp("Lançado_em").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("loja");
}
