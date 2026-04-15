const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// conexión MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projectebigmags"
});

db.connect(err => {
    if (err) {
        console.log("Error BD:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});


// ================= USERS =================

// GET todos
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// GET por id
app.get("/users/:id", (req, res) => {
    db.query("SELECT * FROM users WHERE idUsuari = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0)
            return res.status(404).json({ error: "No trobat" });

        res.json(results[0]);
    });
});

// POST
app.post("/users", (req, res) => {
    const { username, email, role } = req.body;

    db.query(
        "INSERT INTO users (username, email, role) VALUES (?, ?, ?)",
        [username, email, role || "user"],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId });
        }
    );
});

// PUT
app.put("/users/:id", (req, res) => {
    const { username, email, role } = req.body;

    db.query(
        "UPDATE users SET username=?, email=?, role=? WHERE idUsuari=?",
        [username, email, role, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Actualitzat" });
        }
    );
});

// DELETE
app.delete("/users/:id", (req, res) => {
    db.query(
        "DELETE FROM users WHERE idUsuari=?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Eliminat" });
        }
    );
});


// ================= TRUCKS =================

// GET
app.get("/trucks", (req, res) => {
    db.query("SELECT * FROM trucks", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST
app.post("/trucks", (req, res) => {
    const { license_plate, model, driver_name } = req.body;

    db.query(
        "INSERT INTO trucks (license_plate, model, driver_name) VALUES (?, ?, ?)",
        [license_plate, model, driver_name],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId });
        }
    );
});


// ================= ROOT =================
app.get("/", (req, res) => {
    res.send("API simple camions 🚛");
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});