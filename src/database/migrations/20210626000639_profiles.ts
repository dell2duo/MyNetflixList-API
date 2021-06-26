import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("profiles", (table: Knex.TableBuilder) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table.string("birthdate").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.uuid("user_id").notNullable();

      table.foreign("user_id").references("id").inTable("accounts");
    })
    .then(() => {
      console.log("table profiles created!");
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("profiles").then(() => {
    console.log("profiles table dropped!");
  });
}

