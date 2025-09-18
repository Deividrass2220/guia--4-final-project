const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// ---------- Conexión a MySQL ----------
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'techlogistics' // nombre de tu BD en phpMyAdmin
});

db.connect(err => {
  if (err) return console.error('Error al conectar a la BD:', err);
  console.log('Conexión exitosa a MySQL');
});

// ---------- RUTA PRUEBA ----------
app.get('/', (req, res) => res.send('Servidor funcionando con Express y MySQL'));

// =====================
// CRUD CLIENTES
// =====================
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar clientes' });
    res.json(results);
  });
});

app.get('/clientes/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM clientes WHERE id_cliente = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar cliente' });
    if (results.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(results[0]);
  });
});

app.post('/clientes', (req, res) => {
  const nuevoCliente = req.body;
  db.query('INSERT INTO clientes SET ?', nuevoCliente, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear cliente' });
    res.json({ mensaje: 'Cliente creado', id: result.insertId });
  });
});

app.put('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  db.query('UPDATE clientes SET ? WHERE id_cliente = ?', [datos, id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar cliente' });
    res.json({ mensaje: 'Cliente actualizado' });
  });
});

app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM clientes WHERE id_cliente = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar cliente' });
    res.json({ mensaje: 'Cliente eliminado' });
  });
});

// =====================
// CRUD PEDIDOS
// =====================
app.get('/pedidos', (req, res) => {
  db.query('SELECT * FROM pedidos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar pedidos' });
    res.json(results);
  });
});

app.get('/pedidos/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar pedido' });
    if (results.length === 0) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(results[0]);
  });
});

app.post('/pedidos', (req, res) => {
  const nuevoPedido = req.body;
  db.query('INSERT INTO pedidos SET ?', nuevoPedido, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear pedido' });
    res.json({ mensaje: 'Pedido creado', id: result.insertId });
  });
});

app.put('/pedidos/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  db.query('UPDATE pedidos SET ? WHERE id_pedido = ?', [datos, id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar pedido' });
    res.json({ mensaje: 'Pedido actualizado' });
  });
});

app.delete('/pedidos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM pedidos WHERE id_pedido = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar pedido' });
    res.json({ mensaje: 'Pedido eliminado' });
  });
});

// =====================
// CRUD TRANSPORTISTAS
// =====================
app.get('/transportistas', (req, res) => {
  db.query('SELECT * FROM transportistas', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar transportistas' });
    res.json(results);
  });
});

app.get('/transportistas/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM transportistas WHERE id_transportista = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar transportista' });
    if (results.length === 0) return res.status(404).json({ error: 'Transportista no encontrado' });
    res.json(results[0]);
  });
});

app.post('/transportistas', (req, res) => {
  const nuevoTransportista = req.body;
  db.query('INSERT INTO transportistas SET ?', nuevoTransportista, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear transportista' });
    res.json({ mensaje: 'Transportista creado', id: result.insertId });
  });
});

app.put('/transportistas/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  db.query('UPDATE transportistas SET ? WHERE id_transportista = ?', [datos, id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar transportista' });
    res.json({ mensaje: 'Transportista actualizado' });
  });
});

app.delete('/transportistas/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM transportistas WHERE id_transportista = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar transportista' });
    res.json({ mensaje: 'Transportista eliminado' });
  });
});

// =====================
// CRUD RUTAS
// =====================
app.get('/rutas', (req, res) => {
  db.query('SELECT * FROM rutas', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar rutas' });
    res.json(results);
  });
});

app.get('/rutas/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM rutas WHERE id_ruta = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar ruta' });
    if (results.length === 0) return res.status(404).json({ error: 'Ruta no encontrada' });
    res.json(results[0]);
  });
});

app.post('/rutas', (req, res) => {
  const nuevaRuta = req.body;
  db.query('INSERT INTO rutas SET ?', nuevaRuta, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear ruta' });
    res.json({ mensaje: 'Ruta creada', id: result.insertId });
  });
});

app.put('/rutas/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  db.query('UPDATE rutas SET ? WHERE id_ruta = ?', [datos, id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar ruta' });
    res.json({ mensaje: 'Ruta actualizada' });
  });
});

app.delete('/rutas/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM rutas WHERE id_ruta = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar ruta' });
    res.json({ mensaje: 'Ruta eliminada' });
  });
});

// =====================
// CRUD ESTADOS DE ENVÍO
// =====================
app.get('/estados', (req, res) => {
  db.query('SELECT * FROM estados_envio', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar estados' });
    res.json(results);
  });
});

app.get('/estados/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM estados_envio WHERE id_estado = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar estado' });
    if (results.length === 0) return res.status(404).json({ error: 'Estado no encontrado' });
    res.json(results[0]);
  });
});

app.post('/estados', (req, res) => {
  const nuevoEstado = req.body;
  db.query('INSERT INTO estados_envio SET ?', nuevoEstado, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear estado' });
    res.json({ mensaje: 'Estado creado', id: result.insertId });
  });
});

app.put('/estados/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  db.query('UPDATE estados_envio SET ? WHERE id_estado = ?', [datos, id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar estado' });
    res.json({ mensaje: 'Estado actualizado' });
  });
});

app.delete('/estados/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM estados_envio WHERE id_estado = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar estado' });
    res.json({ mensaje: 'Estado eliminado' });
  });
});

// ---------- INICIAR SERVIDOR ----------
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

