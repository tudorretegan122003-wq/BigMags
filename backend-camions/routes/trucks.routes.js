const express = require("express");
const router = express.Router();
const trucksController = require("../controllers/trucks.controller");

router.get("/", trucksController.getAllTrucks);
router.get("/:id", trucksController.getTruckById);
router.post("/", trucksController.createTruck);
router.put("/:id", trucksController.updateTruck);
router.delete("/:id", trucksController.deleteTruck);

module.exports = router;