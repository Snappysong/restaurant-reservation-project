// const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const tablesService = require("./tables.service");
// const reservationsService = require("../reservations/reservations.service");


// async function tableExists(req, res, next) {
//     const id = req.params.table_id;
//     const table = await tablesService.read(Number(id));
//     if (table) {
//         res.locals.table = table;
//         return next();
//     }
//     return next({
//         status: 404,
//         message: `Table with ID: ${id} cannot be found.`
//     });
// }

// function tableHasData(req, res, next) {
//     const {data} = req.body;
//     if (!data) {
//       next({
//         status: 400,
//         message: `Needs to have table data!`
//       });
//     }
//     return next();
// }

// function tableHasName(req, res, next) {
//     const {data: {table_name}} = req.body;
//     if (!table_name || table_name === "" || table_name.length < 3) {
//       next({
//         status: 400,
//         message: `A valid table_name is required.`
//       });
//     }
//     return next();
// }

// function tableHasCapacity(req, res, next) {
//     const {data: {capacity}} = req.body;
//     if (!capacity || isNaN(capacity) || capacity === 0) {
//         next({
//             status: 400,
//             message: `A valid capacity is required.`
//         });
//     }
//     return next();
// }

// function tableHasResID(req, res, next) {
//     const {data: {reservation_id}} = req.body;
//     if (!reservation_id) {
//         next({
//             status: 400,
//             message: `You need to have a reservation_id.`
//         });
//     }
//     return next();
// }

// async function resIdExists(req, res, next) {
//     const {data: {reservation_id}} = req.body;
//     const check = await reservationsService.read(reservation_id);
//     if (!check) {
//         next({
//             status: 404,
//             message: `This reservation_id: ${reservation_id} does not exist.`
//         });
//     }
//     return next();
// }

// async function isOccupied(req, res, next) {
//     const table_id = req.params.table_id;
//     const check = await tablesService.read(table_id);
//     if (check.reservation_id) {
//         next({
//             status: 400,
//             message: `This table is occupied.`
//         })
//     }
//     return next();
// }

// async function sufficientCapacity(req, res, next) {
//     const table = res.locals.table;
//     const currentTable = await tablesService.read(table.table_id);
//     const {data: { reservation_id}} = req.body;
//     const reservation = await reservationsService.read(reservation_id);
//     if (reservation.people > currentTable.capacity) {
//         next({
//             status: 400,
//             message: `This table doesn't have enough capacity.`
//         });
//     }
//     return next();
// }

// async function tableIsNotOccupied(req, res, next) {
//     const table = res.locals.table;
//     const currentTable = await tablesService.read(table.table_id);
//     if (!currentTable.reservation_id) {
//         next({
//             status: 400,
//             message: `This table is not occupied.`
//         });
//     }
//     return next();
// }

// async function list(req, res) {
//     const data = await tablesService.list();
//     res.json({ data });
// }

// function read(req, res) {
//     const data = res.locals.table;
//     res.json({ data });
// }

// async function create(req, res) {
//     const data = await tablesService.create(req.body.data);
//     res.status(201).json({ data });
//   }

// async function update(req, res) {
//     const id = req.params.table_id;
//     const updatedTable = {
//         ...req.body.data,
//         table_id: id,
//     };
//     const data = await tablesService.update(updatedTable)
//     res.status(200).json({ data });
// }

// async function clear(req, res) {
//     const table = res.locals.table;
//     const id = table.table_id;
//     const data = await tablesService.clear(Number(id));
//     res.status(200).json({ data });
// }

// module.exports = {
//     list: [asyncErrorBoundary(list)],
//     read: [
//         asyncErrorBoundary(tableExists),
//         read,
//     ],
//     create: [
//         tableHasData,
//         tableHasName,
//         tableHasCapacity,
//         asyncErrorBoundary(create),
//     ],
//     update: [
//         asyncErrorBoundary(tableExists),
//         tableHasData,
//         tableHasResID,
//         asyncErrorBoundary(resIdExists),
//         asyncErrorBoundary(sufficientCapacity),
//         asyncErrorBoundary(isOccupied),
//         asyncErrorBoundary(update),
//     ],
//     delete: [
//         asyncErrorBoundary(tableExists),
//         asyncErrorBoundary(tableIsNotOccupied),
//         asyncErrorBoundary(clear),

//     ],
// }



const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const onlyValidProperties = require("../errors/onlyValidProperties");

const REQUIRED_PROPERTIES = ["table_name", "capacity"];
const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id", "people"];
//! <<------- VALIDATION ------->>
const hasOnlyValidPropertiesForCreate =
  onlyValidProperties(VALID_PROPERTIES);
const hasRequiredPropertiesForCreate = hasProperties(REQUIRED_PROPERTIES);

const hasOnlyValidPropertiesToSeat = onlyValidProperties(["reservation_id"]);
const hasRequiredPropertiesToSeat = hasProperties(["reservation_id"]);

function hasValidName(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length >= 2) {
    return next();
  }
  next({
    status: 400,
    message: `table_name '${table_name}' must be at least 2 characters long.`,
  });
}

function hasValidCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity > 0 && Number.isInteger(capacity)) {
    return next();
  }
  next({
    status: 400,
    message: `capacity '${capacity}' must be a whole number greater than 0.`,
  });
}

async function tableExists(req, res, next) {
  const { tableId } = req.params;
  const table = await service.read(tableId);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `table_id '${tableId}' does not exist.`,
  });
}

function tableVacant(req, res, next) {
  const table = res.locals.table;
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `table_id '${table.table_id}' is occupied by reservation_id '${table.reservation_id}'.`,
  });
}

function tableNotVacant(req, res, next) {
  const table = res.locals.table;
  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `table_id '${table.table_id}' is not occupied.`,
  });
}

async function reservationAlreadySeated(req, res, next) {
  const { reservation_id } = req.body.data;
  const seated = await service.readTableByReservation(reservation_id);
  if (!seated) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_id '${reservation_id}' is already seated at table_id '${seated.table_id}'.`,
  });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await service.readReservation(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation ${reservation_id} does not exist.`,
  });
}

async function hasEnoughCapacity(req, res, next) {
  const { reservation, table } = res.locals;

  if (table.capacity >= reservation.people) {
    return next();
  }
  next({
    status: 400,
    message: `table capacity '${table.capacity}' is smaller than group size '${reservation.people}'.`,
  });
}

//! <<-------- CRUDL ------->>
async function create(req, res) {
  const table = req.body.data;
  const data = await service.create(table);
  res.status(201).json({ data });
}

function read(req, res) {
  const data = res.locals.table;
  res.json({ data });
}

async function updateSeatReservation(req, res) {
  const { reservation_id } = req.body.data;
  const table_id = req.params.tableId;
  const data = await service.updateSeatReservation(reservation_id, table_id);
  res.json({ data });
}

async function deleteSeatReservation(req, res) {
  const { table_id, reservation_id } = res.locals.table;
  const data = await service.deleteSeatReservation(table_id, reservation_id);
  res.status(200).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  create: [
    hasOnlyValidPropertiesForCreate,
    hasRequiredPropertiesForCreate,
    hasValidName,
    hasValidCapacity,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), read],
  updateSeatReservation: [
    hasRequiredPropertiesToSeat,
    hasOnlyValidPropertiesToSeat,
    asyncErrorBoundary(tableExists),
    tableVacant,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(hasEnoughCapacity),
    asyncErrorBoundary(reservationAlreadySeated),
    asyncErrorBoundary(updateSeatReservation),
  ],
  deleteSeatReservation: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableNotVacant),
    asyncErrorBoundary(deleteSeatReservation),
  ],
  list: asyncErrorBoundary(list),
};