const knex = require("../db/connection");

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .first();
}

function list() {
    return knex("tables")
        .select("*");
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*");
}

module.exports = {
    read,
    list,
    create,
    update,

}