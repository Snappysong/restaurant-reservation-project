// /**
//  * Defines the router for reservation resources.
//  *
//  * @type {Router}
//  */

// const router = require("express").Router();
// const controller = require("./reservations.controller");
// const methodNotAllowed = require("../errors/methodNotAllowed");


// router
//     .route("/")
//     .get(controller.list)
//     .post(controller.create)
//     .all(methodNotAllowed);

// router
//     .route("/:reservation_id/")
//     .get(controller.read)
//     .all(methodNotAllowed);

// router
//     .route("/:reservation_id/status")
//     .put(controller.update)
//     .put(controller.updateStatusToBooked)
//     .put(controller.updateStatusToSeated)
//     .put(controller.updateStatusToFinished)
//     .all(methodNotAllowed)

// module.exports = router;

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

router
  .route("/:reservationId([0-9]+)")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);
router
  .route("/:reservationId([0-9]+)/status")
  .put(controller.updateStatus)
  .all(methodNotAllowed);

module.exports = router;