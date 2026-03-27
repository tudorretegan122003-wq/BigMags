const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


// =======================
// Ruta inicial
// =======================
app.get("/", (req, res) => {
    res.json({ message: "API ProjecteBigMags funcionant" });
});


// =======================
// GET tots els camions
// =======================
app.get("/camions", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM Camions");
        res.json(rows);
    } catch (err) {
        res.status(500).json({
            error: "Error en la BD",
            descripcio: err.message
        });
    } finally {
        if (conn) conn.end();
    }
});


// =======================
// GET camió per ID
// =======================
app.get("/camions/:camio_id", async (req, res) => {
    let conn;
    try {
        const id = parseInt(req.params.camio_id);

        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM Camions WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Camió no trobat" });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({
            error: "Error en la BD",
            descripcio: err.message
        });
    } finally {
        if (conn) conn.end();
    }
});


// =======================
// POST crear camió
// =======================
app.post("/camions", async (req, res) => {
    let conn;
    try {
        const dadesCamio = req.body;

        if (!(dadesCamio.matricula && dadesCamio.marca && dadesCamio.model)) {
            return res.status(400).json({ error: "Falten dades obligatòries" });
        }

        conn = await pool.getConnection();

        const result = await conn.query(
            `INSERT INTO Camions (matricula, marca, model, kilometresActuals, estat)
             VALUES (?, ?, ?, ?, ?)`,
            [
                dadesCamio.matricula,
                dadesCamio.marca,
                dadesCamio.model,
                dadesCamio.kilometresActuals || 0,
                dadesCamio.estat || "actiu"
            ]
        );

        res.status(201).json({
            message: "Camió creat correctament",
            id: result.insertId
        });

    } catch (err) {
        res.status(500).json({
            error: "Error en la BD",
            descripcio: err.message
        });
    } finally {
        if (conn) conn.end();
    }
});


// =======================
// PUT modificar camió
// =======================
app.put("/camions/:camio_id", async (req, res) => {
    let conn;
    try {
        const id = parseInt(req.params.camio_id);
        const dades = req.body;

        conn = await pool.getConnection();

        const rows = await conn.query("SELECT * FROM Camions WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Camió no trobat" });
        }

        const row = rows[0];

        await conn.query(
            `UPDATE Camions
             SET matricula = ?, marca = ?, model = ?, kilometresActuals = ?, estat = ?
             WHERE id = ?`,
            [
                dades.matricula || row.matricula,
                dades.marca || row.marca,
                dades.model || row.model,
                dades.kilometresActuals ?? row.kilometresActuals,
                dades.estat || row.estat,
                id
            ]
        );

        res.json({ message: "Camió actualitzat correctament" });

    } catch (err) {
        res.status(500).json({
            error: "Error en la BD",
            descripcio: err.message
        });
    } finally {
        if (conn) conn.end();
    }
});


// =======================
// DELETE eliminar camió
// =======================
app.delete("/camions/:camio_id", async (req, res) => {
    let conn;
    try {
        const id = parseInt(req.params.camio_id);

        conn = await pool.getConnection();

        const rows = await conn.query("SELECT * FROM Camions WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Camió no trobat" });
        }

        await conn.query("DELETE FROM Camions WHERE id = ?", [id]);

        res.json({ message: "Camió eliminat correctament" });

    } catch (err) {
        res.status(500).json({
            error: "Error en la BD",
            descripcio: err.message
        });
    } finally {
        if (conn) conn.end();
    }
});


// =======================
// Obrim servidor
// =======================
app.listen(port, () => {
    console.log(`Servidor escoltant a http://localhost:${port}`);
});