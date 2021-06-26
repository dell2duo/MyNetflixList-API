import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("accounts", (table: Knex.TableBuilder) => {
      table.uuid("id").primary();
      table.string("email").notNullable().unique();
      table.string("password_hash").notNullable();
      table.string("name").notNullable();
      table.date("birthdate").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log("table accounts created!");
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("accounts").then(() => {
    console.log("accounts table dropped!");
  });
}

