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
    database: "projectebitmags"
});

db.connect(err => {
    if (err) {
        console.log("Error BD:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});


//USERS 
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


//TRUCKS
// GET
app.get("/trucks", (req, res) => {
    db.query("SELECT * FROM trucks", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});


app.get("/trucks/:id", (req, res) => {
    const id = parseInt(req.params.id)
    db.get(`SELECT * FROM trucks WHERE id = ${id}`, [], (err, row) => {
        if (err) {
            return res.status(500).json({error: "Error en la BD",descripcio:error});
        }
        if (row) {
            console.log(row)
            return res.json(row);
        }
        else {
            return res.status(404).json({error: "Camión no encontrado"});
        }
    });
})

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

//Routes
// GET routes
app.get("/routes", (req, res) => {
    db.query("SELECT * FROM routes", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST routes
app.post("/routes", (req, res) => {
    const { truck_id, start_location, end_location, distance_km, fuel_consumed_liters, date } = req.body;

    db.query(
        `INSERT INTO routes 
        (truck_id, start_location, end_location, distance_km, fuel_consumed_liters, date)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [truck_id, start_location, end_location, distance_km, fuel_consumed_liters, date],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId });
        }
    );
});

// DELETE routes
app.delete("/routes/:id", (req, res) => {
    db.query("DELETE FROM routes WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Ruta eliminada" });
    });
});

//Fuel
// GET fuel
app.get("/fuel", (req, res) => {
    db.query("SELECT * FROM fuel_invoices", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST fuel
app.post("/fuel", (req, res) => {
    const { truck_id, date, fuel_type, liters, price_per_liter, total_price } = req.body;

    db.query(
        `INSERT INTO fuel_invoices 
        (truck_id, date, fuel_type, liters, price_per_liter, total_price)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [truck_id, date, fuel_type, liters, price_per_liter, total_price],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId });
        }
    );
});

// DELETE fuel
app.delete("/fuel/:id", (req, res) => {
    db.query("DELETE FROM fuel_invoices WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Eliminat" });
    });
});
//Mantenimento
// GET maintenance
app.get("/maintenance", (req, res) => {
    db.query("SELECT * FROM maintenance_invoices", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST maintenance
app.post("/maintenance", (req, res) => {
    const { truck_id, date, description, cost } = req.body;

    db.query(
        "INSERT INTO maintenance_invoices (truck_id, date, description, cost) VALUES (?, ?, ?, ?)",
        [truck_id, date, description, cost],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId });
        }
    );
});

// DELETE maintenance
app.delete("/maintenance/:id", (req, res) => {
    db.query("DELETE FROM maintenance_invoices WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Eliminat" });
    });
});
//Calendario
// GET calendar
app.get("/calendar", (req, res) => {
    db.query("SELECT * FROM calendar_events", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST calendar
app.post("/calendar", (req, res) => {
    const { truck_id, event_type, date, time, location } = req.body;

    db.query(
        `INSERT INTO calendar_events 
        (truck_id, event_type, date, time, location)
        VALUES (?, ?, ?, ?, ?)`,
        [truck_id, event_type, date, time, location],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId });
        }
    );
});

// DELETE calendar
app.delete("/calendar/:id", (req, res) => {
    db.query("DELETE FROM calendar_events WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Eliminat" });
    });
});
//ROOT
app.get("/", (req, res) => {
    res.send("Benvinguts a BitMags");
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});