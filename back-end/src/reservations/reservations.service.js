const knex = require("../db/connection");


function list() {
    return knex("reservations")
        .select("*");
  }

function listReservationsOnDay(reservation_date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: reservation_date })
        .orderBy("reservation_time")
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .first();
}
  
function create(reservation) {
    return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
}


module.exports = {
    create,
    list,
    listReservationsOnDay,
    read,

  };
  