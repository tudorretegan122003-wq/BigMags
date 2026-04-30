const bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors");
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Configuració similar a l'exemple
app.use(bodyParser.json());
app.use(cors());

// Connexió MySQL 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projectebitmags"
});

db.connect((err) => {
    if (err) {
        console.error("Error en la connexió a la BD:", err.message);
    } else {
        console.log("Conectat a MySQL");
    }
});

//USUAIS

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        }
        return res.json(rows);
    });
});

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID invàlid" });
    }

    db.query("SELECT * FROM users WHERE idUsuari = ?", [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        }
        if (rows && rows.length > 0) {
            console.log(rows);
            return res.json(rows);
        } else {
            return res.status(404).json({ error: "Usuari no trobat" });
        }
    });
});

app.post("/users", (req, res) => {
    const dadesUsuari = req.body;
    
    if (!(dadesUsuari.username && dadesUsuari.email)) {
        return res.json({ error: "Falten dades (username o email)" });
    }

    const sql = "INSERT INTO users (username, email) VALUES (?, ?)";
    
    const params = [dadesUsuari.username, dadesUsuari.email];

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        } else {
            return res.json({ message: "Usuari creat", id: result.insertId });
        }
    });
});

function provaEnviarPost(username, email) {
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, email: email })
    }).then((resposta) => {
        if (!resposta.ok) {
            throw new Error("Error resposta servidor: " + resposta.statusText);
        }
        return resposta.text();
    }).then(text => {
        console.log("El servidor diu:", text);
    })
    .catch(error => {
        console.log("----- ERROR:", error);
    });
}

app.put("/users/:id", (req, res) => {
    const idUsuari = parseInt(req.params.id);
    const dades = req.body;

    db.query("SELECT * FROM users WHERE idUsuari = ?", [idUsuari], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        }
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: "Usuari no trobat" });
        }

        const sql = "UPDATE users SET username = ?, email = ? WHERE idUsuari = ?";
        db.query(sql, [dades.username, dades.email, idUsuari], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
            } else {
                return res.json({ message: "Usuari actualitzat" });
            }
        });
    });
});

app.delete("/users/:id", (req, res) => {
    const idUsuari = parseInt(req.params.id);
    
    if (isNaN(idUsuari)) {
        return res.status(400).json({ error: "Id mal passat" });
    }

    db.query("DELETE FROM users WHERE idUsuari = ?", [idUsuari], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        }
        if (result.affectedRows === 0) {
             return res.status(404).json({ error: "Id usuari no existeix" });
        }
        return res.json({ msg: "Tot correcte" });
    });
});

//CAMIONS

app.get("/trucks", (req, res) => {
    db.query("SELECT * FROM trucks", (err, rows) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json(rows);
    });
});

app.get("/trucks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invàlid" });

    db.query("SELECT * FROM trucks WHERE id = ?", [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        if (rows.length > 0) return res.json(rows);
        return res.status(404).json({ error: "Camíó no trobat" });
    });
});

app.post("/trucks", (req, res) => {
    const { license_plate, model, driver_name } = req.body;
    const sql = "INSERT INTO trucks (license_plate, model, driver_name) VALUES (?, ?, ?)";
    
    db.query(sql, [license_plate, model, driver_name], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json({ message: "Camió creat", id: result.insertId });
    });
});

app.put("/trucks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { license_plate, model, driver_name } = req.body;
    
    const sql = "UPDATE trucks SET license_plate = ?, model = ?, driver_name = ? WHERE idCamion = ?";
    db.query(sql, [license_plate, model, driver_name, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json({ message: "Camió actualitzat" });
    });
});

app.delete("/trucks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query("DELETE FROM trucks WHERE idCamion = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Camió no trobat" });
        return res.json({ message: "Camió eliminat" });
    });
});

//RUTES

app.get("/routes", (req, res) => {
    db.query("SELECT * FROM route", (err, rows) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json(rows);
    });
});

app.post("/routes", (req, res) => {
    const { start_location, end_location, distance_km } = req.body;

    const sql = "INSERT INTO route (start_location, end_location, distance_km) VALUES (?, ?, ?)";
    
    db.query(sql, [start_location, end_location, distance_km], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json({ message: "Ruta creada", id: result.insertId });
    });
});

app.put("/routes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { start_location, end_location, distance_km } = req.body;

    const sql = "UPDATE route SET start_location = ?, end_location = ?, distance_km = ? WHERE id = ?";
    
    db.query(sql, [start_location, end_location, distance_km, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json({ message: "Ruta actualitzada" });
    });
});

app.delete("/routes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query("DELETE FROM route WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Ruta no trobat" });
        return res.json({ message: "Ruta eliminada" });
    });
});


//COMBUSTIBLE

app.get("/fuel", (req, res) => {
    db.query("SELECT * FROM fuel_invoices", (err, rows) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json(rows);
    });
});

app.post("/fuel", (req, res) => {
    const { truck_id, date, fuel_type, liters, price_per_liter, total_price } = req.body;
    const sql = "INSERT INTO fuel_invoices (truck_id, date, fuel_type, liters, price_per_liter, total_price) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [truck_id, date, fuel_type, liters, price_per_liter, total_price], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json({ message: "Factura creada", id: result.insertId });
    });
});

app.delete("/fuel/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query("DELETE FROM fuel_invoices WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json({ message: "Eliminat" });
    });
});

//MANTENIMENT

app.get("/maintenance", (req, res) => {
    db.query("SELECT * FROM maintenance_invoices", (err, rows) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json(rows);
    });
});

app.post("/maintenance", (req, res) => {
    const { truck_id, date, description, cost } = req.body;
    const sql = "INSERT INTO maintenance_invoices (truck_id, date, description, cost) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [truck_id, date, description, cost], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json({ message: "Manteniment creat", id: result.insertId });
    });
});

app.delete("/maintenance/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query("DELETE FROM maintenance_invoices WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json({ message: "Eliminat" });
    });
});

//DATE_TIME

app.get("/date-times", (req, res) => {
    db.query("SELECT * FROM `date_time`", (err, rows) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json(rows);
    });
});

// GET
app.get("/date-times/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    db.query("SELECT * FROM `date_time` WHERE id = ?", [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        if (rows && rows.length > 0) {
            return res.json(rows);
        } else {
            return res.status(404).json({ error: "Registre no trobat" });
        }
    });
});

// POST
app.post("/date-times", (req, res) => {
    const { user_id, start_datetime, end_datetime, description } = req.body;

    if (!user_id || !start_datetime || !end_datetime) {
        return res.json({ error: "Falten dades (user_id, start_datetime, end_datetime)" });
    }

    const sql = "INSERT INTO `date_time` (user_id, start_datetime, end_datetime, description) VALUES (?, ?, ?, ?)";
    const params = [user_id, start_datetime, end_datetime, description || ""];

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        return res.json({ message: "Registre de data/hora creat", id: result.insertId });
    });
});

// PUT
app.put("/date-times/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { user_id, start_datetime, end_datetime, description } = req.body;

    db.query("SELECT * FROM `date_time` WHERE id = ?", [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: "Registre no trobat" });
        }

        const sql = "UPDATE `date_time` SET user_id = ?, start_datetime = ?, end_datetime = ?, description = ? WHERE id = ?";
        db.query(sql, [user_id, start_datetime, end_datetime, description || "", id], (err, result) => {
            if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
            return res.json({ message: "Registre actualitzat" });
        });
    });
});

// DELETE
app.delete("/date-times/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    db.query("DELETE FROM `date_time` WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error en la BD", descripcio: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Id no existeix" });
        }
        return res.json({ message: "Registre eliminat" });
    });
});

// ROOT
app.get("/", (req, res) => {
    res.send("Benvinguts a BitMags");
});

// Obrim el servidor
app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
});