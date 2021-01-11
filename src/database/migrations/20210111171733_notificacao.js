exports.up = function (knex) {
  return knex.schema
    .createTable("notificacoes", (table) => {
      table.uuid("id").primary();
      table.string("email").notNullable();
      table.string("titulo").notNullable();
      table.string("hora").notNullable();
      table.string("data").notNullable();
    })
    .then(() => {
      console.log("table notificacoes created!");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notificacoes").then(() => {
    console.log("notificacoes table dropped!");
  });
};
