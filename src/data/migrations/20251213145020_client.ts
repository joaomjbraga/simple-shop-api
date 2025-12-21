import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
 await knex.schema.createTable('client', (table) => {
    table.increments('id').primary()
    table.text('name').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
 await knex.schema.dropTable('client')
}


