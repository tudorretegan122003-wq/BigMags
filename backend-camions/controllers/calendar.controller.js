const db = require("../db/connection");

exports.getEvents = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM calendar_events");
  res.json(rows);
};

exports.createEvent = async (req, res) => {
  const { truck_id, event_type, date, time, location } = req.body;

  const [result] = await db.query(
    `INSERT INTO calendar_events 
    (truck_id, event_type, date, time, location) 
    VALUES (?, ?, ?, ?, ?)`,
    [truck_id, event_type, date, time, location]
  );

  res.json({ id: result.insertId });
};

exports.deleteEvent = async (req, res) => {
  await db.query("DELETE FROM calendar_events WHERE id=?", [req.params.id]);
  res.json({ message: "Eliminat" });
};