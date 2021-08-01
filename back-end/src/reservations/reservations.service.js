const knex = require("../db/connection");


function list() {
    return knex("reservations");
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
        .then((result) => result[0]);
}
  
function create(reservation) {
    return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((result) => result[0]);
}

function update(updatedReservation) {
    return knex("reservations")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*")
        .then((result) => result[0]);
}


module.exports = {
    create,
    list,
    listReservationsOnDay,
    read,
    update,

};
  