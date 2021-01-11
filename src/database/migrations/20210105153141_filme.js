exports.up = function (knex) {
  return knex.schema
    .createTable("filmes", (table) => {
      table.uuid("id").primary();
      table.string("id_filme").notNullable();
      table.string("nome").notNullable();
      table.string("poster");
      table.boolean("assistido");
      table.timestamp("criado_em").defaultTo(knex.fn.now());
      table.uuid("id_perfil").notNullable();

      table.foreign("id_perfil").references("id").inTable("perfis");
    })
    .then(() => {
      console.log("table filmes created!");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("filmes").then(() => {
    console.log("filmes table dropped!");
  });
};
