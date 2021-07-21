const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
/**
 * List handler for reservation resources
 */

//MIDDLEWARE
async function resExists(req, res, next) {
  const {reservation_id} = req.params;
  const reservation = await service.read(reservation_id)
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation id does not exist: ${reservation_id}.`
  });
}

function resHasFirstName(req, res, next) {
  const {first_name = ""} = req.body.data;
  if (!first_name || first_name === "") {
    next({
      status: 400,
      message: `A first_name is required.`
    });
  }
  return next();
}

function resHasLastName(req, res, next) {
  const {last_name = ""} = req.body.data;
  if (!last_name || last_name === "") {
    next({
      status: 400,
      message: `A last_name is required.`
    });
  }
  return next();
}

function resHasMobilePhone(req, res, next) {
  const {mobile_number = ""} = req.body.data;
  if (!mobile_number || mobile_number === "") {
    next({
      status: 400,
      message: `A mobile_number is required.`
    });
  }
  return next();
}

function resHasReservationDate(req, res, next) {
  const {reservation_date = ""} = req.body.data;
  let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!reservation_date || reservation_date === "" || !date_regex.test(reservation_date) ) {
    next({
      status: 400,
      message: `A valid reservation_date is required.`
    });
  }
  return next();
}

//CHECK WORKS
function resHasReservationTime(req, res, next) {
  const {reservation_time = ""} = req.body.data;
  let time_regex = /^(0[1-9]|1[1-9])\/(0[1-9]|1[1-9])\$/;
  if (!reservation_time || reservation_time === "" || !time_regex.test(reservation_time) ) {
    next({
      status: 400,
      message: `A valid reservation_time is required.`
    });
  }
  return next();
}

//CHECK IF NAN WORKS
function resHasPeopleCount(req, res, next) {
  const {people = ""} = req.body.data;
  if (!people || people === "" || !isNaN(people) ) {
    next({
      status: 400,
      message: `A valid amount of people is required.`
    });
  }
  return next();
}

//CRUD FUNCTIONS
async function list(req, res) {
  const reservation_date = req.query;
  console.log(reservation_date);
  const { viewDate, date } = reservation_date;
  console.log(viewDate, date);
  if (date) {
    const data = await service.listReservationsOnDay(date);
    res.json({ data });  
  } else if (viewDate) {
    const data = await service.listReservationsOnDay(viewDate);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

//check and export!
async function read(req, res) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body);
  res.status(201).json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    resHasFirstName,
    resHasLastName,
    resHasMobilePhone,
    resHasReservationDate,
    resHasReservationTime,
    resHasPeopleCount,
    asyncErrorBoundary(create),
  ],
};
