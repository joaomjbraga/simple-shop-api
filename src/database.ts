import knex, { type Knex } from 'knex'

const Config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './src/data/dados.db'
  },
  pool: {
    afterCreate: (connection: any, done: any ) =>  {
      connection.run("PRAGMA foreign_key = ON")
      done()
    }
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/data/migrations/'
  },
  seeds: {
    extension: 'ts',
    directory: './src/data/seed/'
  }
}

export default Config
export const SetupKnex = knex(Config)