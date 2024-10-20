const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let screws = [
  { id: 1, name: 'Screw 1', quantity: 100 },
  { id: 2, name: 'Screw 2', quantity: 200 },
];

// Obtener todos los tornillos
app.get('/screws', (req, res) => {
  res.json(screws);
});

// Obtener el total de tornillos
app.get('/screws/total', (req, res) => {
  const total = screws.reduce((acc, screw) => acc + screw.quantity, 0);
  res.json({ total });
});

// Crear un nuevo tornillo
app.post('/screws', (req, res) => {
  const newScrew = {
    id: screws.length + 1,
    name: req.body.name,
    quantity: req.body.quantity,
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