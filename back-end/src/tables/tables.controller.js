const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const { table } = require("../db/connection");

async function tableExists(req, res, next) {
    const id = req.params.table_id;
    const table = await tablesService.read(Number(id));
    if (table) {
        res.locals.table = table;
        res.locals.table_id = table.table_id;
        return next();
    }
    return next({
        status: 404,
        message: `Table with ID: ${id} cannot be found.`
    });
}

//TEST IS STOPPING HERE!
async function tableExistsToClear(req, res, next) {
    const {data: {table_id} }= req.body;
    console.log(table_id);
    const table = await tablesService.read(Number(table_id));
    if (table) {
        res.locals.table = table;
        return next();
    };
    return next({
        status: 404,
        message: `Table with ID: ${table_id} cannot be found.`
    })
}

function tableHasData(req, res, next) {
    const {data} = req.body;
    if (!data) {
      next({
        status: 400,
        message: `Needs to have table data!`
      });
    }
    return next();
}

function tableHasName(req, res, next) {
    const {data: {table_name}} = req.body;
    if (!table_name || table_name === "" || table_name.length < 3) {
      next({
        status: 400,
        message: `A valid table_name is required.`
      });
    }
    return next();
}

function tableHasCapacity(req, res, next) {
    const {data: {capacity}} = req.body;
    if (!capacity || isNaN(capacity) || capacity === 0) {
        next({
            status: 400,
            message: `A valid capacity is required.`
        });
    }
    return next();
}

function tableHasResID(req, res, next) {
    const {data: {reservation_id}} = req.body;
    if (!reservation_id) {
        next({
            status: 400,
            message: `You need to have a reservation_id.`
        });
    }
    return next();
}

async function resIdExists(req, res, next) {
    const {data: {reservation_id}} = req.body;
    const check = await reservationsService.read(reservation_id);
    if (!check) {
        next({
            status: 404,
            message: `This reservation_id: ${reservation_id} does not exist.`
        });
    }
    return next();
}

async function isOccupied(req, res, next) {
    const table_id = req.params.table_id;
    const check = await tablesService.read(table_id);
    if (check.reservation_id) {
        next({
            status: 400,
            message: `This table is occupied.`
        })
    }
    return next();
}

async function sufficientCapacity(req, res, next) {
    const {data: {table_id}} = req.body;
    const table = await tablesService.read(table_id);
    const {data: { reservation_id}} = req.body;
    const reservation = await reservationsService.read(reservation_id);
    if (reservation.people > table.capacity) {
        next({
            status: 400,
            message: `This table doesn't have enough capacity.`
        });
    }
    return next();
}

async function tableIsNotOccupied(req, res, next) {
    const id = res.locals.table_id;
    const table = await tablesService.read(id);
    console.log(table)
    if (!table.reservation_id) {
        next({
            status: 400,
            message: `This table is not occupied.`
        });
    }
    return next();
}

async function list(req, res) {
    const data = await tablesService.list();
    res.json({ data });
}

function read(req, res) {
    const data = res.locals.table;
    res.json({ data });
}

async function create(req, res) {
    const data = await tablesService.create(req.body.data);
    res.status(201).json({ data });
  }

async function update(req, res) {
    const id = req.params.table_id;
    const updatedTable = {
        ...req.body.data,
        table_id: id,
    };
    const data = await tablesService.update(updatedTable)
    res.status(200).json({ data });
}

async function clear(req, res) {
    //WHAT IS THIS ID? WHY WONT IT CONSOLELOG?
    const id = res.locals.table_id;
    const table = await tablesService.read(id);
    console.log(id);
    console.log(table);
    const data = await tablesService.clear(Number(table.table_id));
    res.status(200).json({ data });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [
        asyncErrorBoundary(tableExists),
        read,
    ],
    create: [
        tableHasData,
        tableHasName,
        tableHasCapacity,
        asyncErrorBoundary(create),
    ],
    update: [
        asyncErrorBoundary(tableExists),
        tableHasData,
        tableHasResID,
        asyncErrorBoundary(resIdExists),
        asyncErrorBoundary(sufficientCapacity),
        asyncErrorBoundary(isOccupied),
        asyncErrorBoundary(update),
    ],
    delete: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(tableIsNotOccupied),
        asyncErrorBoundary(clear),

    ],
}