import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("movies", (table: Knex.TableBuilder) => {
      table.uuid("id").primary();
      table.string("movie_id").notNullable();
      table.string("name").notNullable();
      table.string("poster");
      table.boolean("watched");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.uuid("profile_id").notNullable();

      table.foreign("profile_id").references("id").inTable("profiles");
    })
    .then(() => {
      console.log("table movies created!");
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movies").then(() => {
    console.log("movies table dropped!");
  });
}

