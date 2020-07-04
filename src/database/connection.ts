import knex from 'knex'

const connection = knex({
    client: 'pg',
    version: '11.5',
    connection: {
      host : '127.0.0.1',
      user : 'semicheche',
      password : 'semicheche',
      database : 'app_collect',
    }
})

export default connection;