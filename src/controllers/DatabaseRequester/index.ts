import Knex from "knex";

const connection = require("../database/connection");

export default abstract class DatabaseRequester {
  dbRequest: Knex;

  constructor() {
    this.dbRequest = connection;
  }
}
