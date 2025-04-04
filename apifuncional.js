const express = require('express');
const { Pool, Client } = require('pg'); 
const app = express();
const port = 2211;
const cors = require('cors');

const DB_NAME = 'Incidentes_bat';
const DB_USER = 'postgres';
const DB_HOST = 'localhost';
const DB_PASSWORD = 'lol'; //esta variable se cambia por la contraseña q tengan xd 
const DB_PORT = 5432;

const initDatabase = async () => {
    const client = new Client({
        user: DB_USER,
        host: DB_HOST,
        database: 'postgres', 
        password: DB_PASSWORD,
        port: DB_PORT,
    });

    try {
        await client.connect();
        const dbExists = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`);
        
        if (dbExists.rowCount === 0) {
            await client.query(`CREATE DATABASE "${DB_NAME}";`);
            console.log(`Base de datos "${DB_NAME}" creada exitosamente.`);
        } else {
            console.log(`La base de datos "${DB_NAME}" ya existe.`);
        }
    } catch (err) {
        console.error('Error verificando/creando la base de datos:', err);
    } finally {
        await client.end();
    }
};

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME, 
    password: DB_PASSWORD,
    port: DB_PORT,
});

const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS incidents (
            id SERIAL PRIMARY KEY,
            reporter VARCHAR(255) NOT NULL,
            description TEXT NOT NULL CHECK (LENGTH(description) >= 10),
            status VARCHAR(50) NOT NULL DEFAULT 'pendiente',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(query);
        console.log('Tabla "incidents" creada o ya existe');
    } catch (err) {
        console.error('Error al crear la tabla:', err);
    }
};

const initialize = async () => {
    await initDatabase();
    await createTable();
};

initialize();

app.use(express.json());
app.use(cors());

app.post('/incidents', async (req, res) => {
    const { reporter, description } = req.body;

    if (!reporter) {
        return res.status(400).json({ error: 'reporter es obligatorio' });
    }

    if (!description || description.length < 10) {
        return res.status(400).json({ error: 'description debe tener al menos 10 caracteres' });
    }

    const created_at = new Date().toISOString();
    const query = `
        INSERT INTO incidents (reporter, description, status, created_at)
        VALUES ($1, $2, 'pendiente', $3)
        RETURNING *;
    `;
    try {
        const result = await pool.query(query, [reporter, description, created_at]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error al crear incidente:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/incidents', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM incidents');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener incidentes:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/incidents/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM incidents WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: '404 Not Found - Incidente no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error al obtener incidente:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.put('/incidents/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pendiente', 'en proceso', 'resuelto'].includes(status)) {
        return res.status(400).json({ error: 'El estado debe ser "pendiente", "en proceso" o "resuelto".' });
    }

    try {
        const result = await pool.query('UPDATE incidents SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: '404 Not Found - Incidente no encontrado' });
        }
        res.json({ message: 'Estado actualizado correctamente', incident: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar estado:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/incidents/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM incidents WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: '404 Not Found - Incidente no encontrado' });
        }
        res.json({ message: 'Incidente eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar incidente:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
