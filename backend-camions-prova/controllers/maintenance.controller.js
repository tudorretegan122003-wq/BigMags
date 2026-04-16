const db = require("../db/connection");

exports.getMaintenance = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM maintenance_invoices");
  res.json(rows);
};

exports.createMaintenance = async (req, res) => {
  const { truck_id, date, description, cost } = req.body;

  const [result] = await db.query(
    "INSERT INTO maintenance_invoices (truck_id, date, description, cost) VALUES (?, ?, ?, ?)",
    [truck_id, date, description, cost]
  );

  res.json({ id: result.insertId });
};

exports.deleteMaintenance = async (req, res) => {
  await db.query("DELETE FROM maintenance_invoices WHERE id=?", [req.params.id]);
  res.json({ message: "Eliminat" });
};