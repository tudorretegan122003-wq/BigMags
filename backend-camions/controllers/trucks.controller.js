const db = require("../db/connection");

// GET ALL
exports.getAllTrucks = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM trucks");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET BY ID
exports.getTruckById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM trucks WHERE id = ?",
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE
exports.createTruck = async (req, res) => {
  try {
    const { license_plate, model, driver_name } = req.body;

    const [result] = await db.query(
      "INSERT INTO trucks (license_plate, model, driver_name) VALUES (?, ?, ?)",
      [license_plate, model, driver_name]
    );

    res.json({ message: "Camió creat", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
exports.updateTruck = async (req, res) => {
  try {
    const { license_plate, model, driver_name } = req.body;

    await db.query(
      "UPDATE trucks SET license_plate=?, model=?, driver_name=? WHERE id=?",
      [license_plate, model, driver_name, req.params.id]
    );

    res.json({ message: "Camió actualitzat" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
exports.deleteTruck = async (req, res) => {
  try {
    await db.query("DELETE FROM trucks WHERE id = ?", [req.params.id]);
    res.json({ message: "Camió eliminat" });
  } catch (err) {
    res.status(500).json(err);
  }
};