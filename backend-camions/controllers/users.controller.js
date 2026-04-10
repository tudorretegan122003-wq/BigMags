const db = require("../db/connection");

exports.getUsers = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
};

exports.getUserById = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users WHERE idUsuari = ?", [req.params.id]);
  res.json(rows[0]);
};

exports.createUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  const [result] = await db.query(
    "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
    [username, password, email, role || "user"]
  );

  res.json({ id: result.insertId });
};

exports.updateUser = async (req, res) => {
  const { username, email, role } = req.body;

  await db.query(
    "UPDATE users SET username=?, email=?, role=? WHERE idUsuari=?",
    [username, email, role, req.params.id]
  );

  res.json({ message: "Usuari actualitzat" });
};

exports.deleteUser = async (req, res) => {
  await db.query("DELETE FROM users WHERE idUsuari=?", [req.params.id]);
  res.json({ message: "Usuari eliminat" });
};