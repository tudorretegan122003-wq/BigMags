const db = require("../db/connection");

exports.getRoutes = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM routes");
  res.json(rows);
};

exports.createRoute = async (req, res) => {
  const { truck_id, start_location, end_location, distance_km, fuel_consumed_liters, date } = req.body;

  const [result] = await db.query(
    `INSERT INTO routes 
    (truck_id, start_location, end_location, distance_km, fuel_consumed_liters, date) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [truck_id, start_location, end_location, distance_km, fuel_consumed_liters, date]
  );

  res.json({ id: result.insertId });
};

exports.deleteRoute = async (req, res) => {
  await db.query("DELETE FROM routes WHERE id=?", [req.params.id]);
  res.json({ message: "Ruta eliminada" });
};