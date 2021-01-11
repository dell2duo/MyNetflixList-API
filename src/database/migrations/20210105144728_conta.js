exports.up = function (knex) {
  return knex.schema
    .createTable("contas", (table) => {
      table.uuid("id").primary();
      table.string("email").notNullable();
      table.string("senha").notNullable();
      table.string("nome").notNullable();
      table.date("data_nascimento").notNullable();
      table.timestamp("criado_em").defaultTo(knex.fn.now());

      table.unique("email");
    })
    .then(() => {
      console.log("table contas created!");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("contas").then(() => {
    console.log("contas table dropped!");
  });
};
