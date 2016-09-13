// Update with your config settings.

var dotenv = require('dotenv').config()


module.exports = {

  development: {
    client: 'postgres',
    connection: {
      database: 'q2tutorialdb'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
