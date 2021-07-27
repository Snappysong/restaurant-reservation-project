const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

async function tableExists(req, res, next) {
    const id = req.params.table_id;
    console.log(id);
    const table = await service.read(req.params.table_id);
    if (table) {
        res.locals.table = table;
        return next();
    }
    return next({
        status: 404,
        message: 'Table cannot be found.'
    });
}

async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data })
  }

async function update(req, res) {
    const updatedTable = {
        ...req.body.data,
        table_id: res.locals.table.table_id,
    };
    console.log(req.body.data);
    await service.update(updatedTable);
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(tableExists), update],

}