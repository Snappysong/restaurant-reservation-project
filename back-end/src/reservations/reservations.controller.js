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

async function resExistsforUpdate(req, res, next) {
  const {data: {reservation_id}} = req.body;
  const reservation = await service.read(reservation_id);
  console.log(reservation);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation id does not exist foo: ${reservation_id}.`
  });
}

function resHasData(req, res, next) {
  const {data} = req.body;
  if (!data) {
    next({
      status: 400,
      message: `Need to have reservation data!`
    });
  }
  return next();
}

function resHasFirstName(req, res, next) {
  const {data: {first_name}} = req.body;
  if (!first_name || first_name === "") {
    next({
      status: 400,
      message: `A first_name is required.`
    });
  }
  return next();
}

function resHasLastName(req, res, next) {
  const {data: {last_name}} = req.body;
  if (!last_name || last_name === "") {
    next({
      status: 400,
      message: `A last_name is required.`
    });
  }
  return next();
}

function resHasMobilePhone(req, res, next) {
  const {data: {mobile_number}} = req.body;
  if (!mobile_number || mobile_number === "") {
    next({
      status: 400,
      message: `A mobile_number is required.`
    });
  }
  return next();
}

function resHasReservationDate(req, res, next) {
  const {data: {reservation_date}} = req.body;
  if (!reservation_date || reservation_date === "") {
    next({
      status: 400,
      message: `A valid reservation_date is required.`
    });
  }
  const nums = reservation_date.split("-")
  if (nums.length !== 3 || nums[0].length !== 4) {
    next({
      status: 400,
      message: `the reservation_date needs to be a date.`
    })
  }
  return next();
}

function resHasReservationTime(req, res, next) {
  const {data: {reservation_time}} = req.body;
  if (!reservation_time || reservation_time === "") {
    next({
      status: 400,
      message: `A valid reservation_time is required.`
    });
  }
  const nums = reservation_time.split(":");
  if (nums.length !== 2){
    next({
      status: 400,
      message: `The reservation_time needs to be a time.`
    })
  }
  return next();
}

function resHasPeopleCount(req, res, next) {
  const {data: {people}} = req.body;
  if (!people || typeof people !== "number" ) {
    next({
      status: 400,
      message: `A valid amount of people is required.`
    });
  }
  return next();
}

function resNotOnTuesday(req, res, next) {
  const {data: {reservation_date, reservation_time}} = req.body;
  let year = reservation_date.split("-")[0];
  let month = reservation_date.split("-")[1] - 1;
  let day = reservation_date.split("-")[2];
  let hour = reservation_time.split(":")[0];
  let min = reservation_time.split(":")[1];
  const resDate = new Date(year, month, day, hour, min);
  if (resDate.getDay() === 2) {
    next({
      status: 400,
      message: `This reservation_date is on a Tuesday and we are closed.`
    });
  }
  return next();
}

function resNotInPast(req, res, next) {
  const {data: {reservation_date, reservation_time}} = req.body;
  let year = reservation_date.split("-")[0];
  let month = reservation_date.split("-")[1] - 1;
  let day = reservation_date.split("-")[2];
  let hour = reservation_time.split(":")[0];
  let min = reservation_time.split(":")[1];
  const resDate = new Date(year, month, day, hour, min);
  const currentDate = new Date();
  if (resDate.getTime() < currentDate.getTime()) {
    next({
      status: 400,
      message: `This reservation_date needs to be in the future!`
    });
  }
  return next();
}

function resInValidTime(req, res, next) {
  const {data: {reservation_date, reservation_time}} = req.body;
  let year = reservation_date.split("-")[0];
  let month = reservation_date.split("-")[1] - 1;
  let day = reservation_date.split("-")[2];
  let hour = reservation_time.split(":")[0];
  let min = reservation_time.split(":")[1];
  const resDate = new Date(year, month, day, hour, min);
  if (resDate.getHours() < 10) {
    next({
      status: 400, 
      message: `This reservation_time is before we are open.`
    });
  }
  if (resDate.getHours() === 10) {
    if (resDate.getMinutes() < 30) {
      next({
        status: 400, 
        message: `This reservation_time is before we are open.`
      });
    }
  }
  if (resDate.getHours() > 21) {
    next({
      status: 400, 
      message: `This reservation_time is after we are closed.`
    });
  }
  if (resDate.getHours() === 21) {
    if (resDate.getMinutes() > 30) {
      next({
        status: 400,
        message: `This reservation_time is after we are closed.`
      });
    }
  }
  return next();
}

//CRUD FUNCTIONS
async function list(req, res) {
  const reservation_date = req.query;
  const { viewDate, date } = reservation_date;
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

async function read(req, res) {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  res.status(200).json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}

async function update(req, res) {
  const reservation = req.body.data;
  const resID = reservation.reservation_id;
  const updatedReservation = {
    ...reservation,
    reservation_id: resID,
  }
  const data = await service.update(updatedReservation)
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    resHasData,
    resHasFirstName,
    resHasLastName,
    resHasMobilePhone,
    resHasReservationDate,
    resHasReservationTime,
    resHasPeopleCount,
    resNotOnTuesday,
    resNotInPast,
    resInValidTime,
    asyncErrorBoundary(create),
  ],
  read: [
    asyncErrorBoundary(resExists),
    asyncErrorBoundary(read),
  ],
  update: [
    asyncErrorBoundary(resExistsforUpdate),
    asyncErrorBoundary(update),
  ],
};
