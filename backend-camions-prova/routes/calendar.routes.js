const express = require("express");
const router = express.Router();
const controller = require("../controllers/calendar.controller");

router.get("/", controller.getEvents);
router.post("/", controller.createEvent);
router.delete("/:id", controller.deleteEvent);

module.exports = router;