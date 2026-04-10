const db = require("../db/connection");

exports.getFuel = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM fuel_invoices");
  res.json(rows);
};

exports.createFuel = async (req, res) => {
  const { truck_id, date, fuel_type, liters, price_per_liter, total_price } = req.body;

  const [result] = await db.query(
    `INSERT INTO fuel_invoices 
    (truck_id, date, fuel_type, liters, price_per_liter, total_price) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [truck_id, date, fuel_type, liters, price_per_liter, total_price]
  );

  res.json({ id: result.insertId });
};

exports.deleteFuel = async (req, res) => {
  await db.query("DELETE FROM fuel_invoices WHERE id=?", [req.params.id]);
  res.json({ message: "Eliminat" });
};