const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenance.controller");

router.get("/", controller.getMaintenance);
router.post("/", controller.createMaintenance);
router.delete("/:id", controller.deleteMaintenance);

module.exports = router;