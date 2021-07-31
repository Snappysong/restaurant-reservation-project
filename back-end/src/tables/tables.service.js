const knex = require("../db/connection");

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .then((result) => result[0]);
}

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((result) => result[0]);
}

function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*")
        .then((result) => result[0]);
}

function clear(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .update({ reservation_id: null }, "*")
        .then((result) => result[0]);
}

module.exports = {
    read,
    list,
    create,
    update,
    clear,
}