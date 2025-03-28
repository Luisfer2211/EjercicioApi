const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 2511;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Datos en memoria (sin base de datos)
let incidents = [];
let idCounter = 1;

// Crear un nuevo incidente
app.post('/incidents', (req, res) => {
    const { reporter, description } = req.body;
    
    if (!reporter || description.length < 10) {
        return res.status(400).json({ error: 'Reporter es obligatorio y la descripción debe tener al menos 10 caracteres.' });
    }
    
    const newIncident = {
        id: idCounter++,
        reporter,
        description,
        status: 'pendiente',
        created_at: new Date().toISOString()
    };
    incidents.push(newIncident);
    res.status(201).json(newIncident);
});

// Obtener todos los incidentes
app.get('/incidents', (req, res) => {
    res.json({ incidents });
});

// Obtener un incidente por ID
app.get('/incidents/:id', (req, res) => {
    const { id } = req.params;
    const incident = incidents.find(inc => inc.id == id);
    
    if (!incident) {
        return res.status(404).json({ error: 'Incidente no encontrado' });
    }
    res.json(incident);
});

app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
