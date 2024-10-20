const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { format } = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const formats = ['metric', 'imperial'];
const providerNames = ['Provider A', 'Provider B', 'Provider C'];

let screws = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Screw ${i + 1}`,
  price: (Math.random() * 10).toFixed(2), // Random price between 0 and 10
  format: formats[Math.floor(Math.random() * formats.length)],
  providerName: providerNames[Math.floor(Math.random() * providerNames.length)],
}));

// Obtener todos los tornillos
app.get('/screws', (req, res) => {
  res.json(screws);
});

// Obtener el total de tornillos
app.get('/screws/total', (req, res) => {
  
  res.json({ screws});
});

// Crear un nuevo tornillo
app.post('/screws', (req, res) => {
  const newScrew = {
    id: screws.length + 1,
    name: req.body.name,
    price: req.body.price,
    format: req.body.format,
    providerName: req.body.providerName
  };
  screws.push(newScrew);
  res.status(201).json(newScrew);
});

// Eliminar un tornillo
app.delete('/screws/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  screws = screws.filter(screw => screw.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});