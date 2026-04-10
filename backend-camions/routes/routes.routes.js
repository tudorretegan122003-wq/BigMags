const express = require("express");
const router = express.Router();
const controller = require("../controllers/routes.controller");

router.get("/", controller.getRoutes);
router.post("/", controller.createRoute);
router.delete("/:id", controller.deleteRoute);

module.exports = router;