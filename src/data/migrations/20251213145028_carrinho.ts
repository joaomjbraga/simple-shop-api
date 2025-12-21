import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('carrinho', (table) => {
    table.increments('id').primary()
    table.integer('client_id').references('id').inTable('client')
    table.integer('loja_id').references('id').inTable('loja')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('carrinho')
}