// Update with your config settings.
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./src/database/migrations",
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "pg",
    connection: process.env.DB_URL_TEST,
    migrations: {
      directory: "./src/database/migrations",
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
