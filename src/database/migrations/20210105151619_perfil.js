exports.up = function (knex) {
  return knex.schema
    .createTable("perfis", (table) => {
      table.uuid("id").primary();
      table.string("nome").notNullable();
      table.string("data_nascimento").notNullable();
      table.timestamp("criado_em").defaultTo(knex.fn.now());
      table.uuid("id_conta").notNullable();

      table.foreign("id_conta").references("id").inTable("contas");
    })
    .then(() => {
      console.log("table perfis created!");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("perfis").then(() => {
    console.log("perfis table dropped!");
  });
};
