// const router = require("express").Router();
// const controller = require("./tables.controller");
// const methodNotAllowed = require("../errors/methodNotAllowed");

// router
//     .route("/")
//     .get(controller.list)
//     .post(controller.create)
//     .all(methodNotAllowed);

// router
//     .route("/:table_id")
//     .get(controller.read)
//     .all(methodNotAllowed);

// router
//     .route("/:table_id/seat")
//     .put(controller.update)
//     .delete(controller.delete)
//     .all(methodNotAllowed);

// module.exports = router;

const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);
router.route("/:tableId([0-9]+)").get(controller.read).all(methodNotAllowed);
router
  .route("/:tableId([0-9]+)/seat")
  .put(controller.updateSeatReservation)
  .delete(controller.deleteSeatReservation)
  .all(methodNotAllowed);

module.exports = router;