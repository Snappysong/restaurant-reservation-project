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

//DOES THIS NEED TO BE ASYNC??
function resHasFirstName(req, res, next) {
  const {data: {first_name} = {}} = req.body;
  if (!first_name || first_name === "") {
    next({
      status: 400,
      message: `A first name is required.`
    });
  }
  return next();
}

function resHasLastName(req, res, next) {
  const {data: {last_name} = {}} = req.body;
  if (!last_name || last_name === "") {
    next({
      status: 400,
      message: `A last name is required.`
    });
  }
  return next();
}
function resHasMobilePhone(req, res, next) {
  const {data: {mobile_number} = {}} = req.body;
  if (!mobile_number || mobile_number === "") {
    next({
      status: 400,
      message: `A mobile phone number is required.`
    });
  }
  return next();
}

//CHECK IF DATE PARSE WORKS
function resHasReservationDate(req, res, next) {
  const {data: {reservation_date} = {}} = req.body;
  if (!reservation_date || reservation_date === "" || Date.parse(reservation_date) ) {
    next({
      status: 400,
      message: `A valid reservation date is required.`
    });
  }
  return next();
}

//CHECK IF NAN WORKS
function resHasReservationTime(req, res, next) {
  const {data: {reservation_time} = {}} = req.body;
  if (!reservation_time || reservation_time === "" || !isNaN(reservation_time) ) {
    next({
      status: 400,
      message: `A valid reservation time is required.`
    });
  }
  return next();
}

//CHECK IF NAN WORKS
function resHasPeopleCount(req, res, next) {
  const {data: {people} = {}} = req.body;
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
    // resHasFirstName,
    // resHasLastName,
    // resHasMobilePhone,
    // resHasReservationDate,
    // resHasReservationTime,
    // resHasPeopleCount,
    asyncErrorBoundary(create),
  ],
};
