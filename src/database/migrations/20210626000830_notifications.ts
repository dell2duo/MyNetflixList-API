import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("notifications", (table: Knex.TableBuilder) => {
      table.uuid("id").primary();
      table.string("email").notNullable();
      table.string("title").notNullable();
      table.string("hour").notNullable();
      table.string("date").notNullable();
    })
    .then(() => {
      console.log("table notifications created!");
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("notifications").then(() => {
    console.log("notifications table dropped!");
  });
}

