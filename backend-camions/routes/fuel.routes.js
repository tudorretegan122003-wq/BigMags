const express = require("express");
const router = express.Router();
const controller = require("../controllers/fuel.controller");

router.get("/", controller.getFuel);
router.post("/", controller.createFuel);
router.delete("/:id", controller.deleteFuel);

module.exports = router;