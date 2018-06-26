const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')
var bodyParser = require('body-parser')

app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: '10.142.0.2',
  user: 'root',
  password: 'root',
  database: 'examen'
});
connection.connect()
app.get('/productos', (req, res) => {

  connection.query('SELECT * FROM productos', function (err, rows, fields) {
    if (err) throw err
    res.send(rows);
  })
})

app.post('/agregar', (req, res) => {

  connection.query('INSERT INTO productos (nombre,precio) VALUES(' + "'" + req.body.nombre + "','" + req.body.precio + "')", function (err, rows, field) {
    if (err) throw err
    res.send(req.body);
  })
})

app.delete('/eliminar', (req, res) => {

  connection.query('DELETE FROM  productos WHERE nombre="' + req.body.nombre + '"', function (err, rows, field) {
    if (err) throw err
    res.send(req.body);
  })
})

app.put('/editar', (req, res) => {

  connection.query('UPDATE productos SET nombre="' + req.body.nombre + '",precio=' + req.body.precio + ' WHERE nombre="' + req.body.nombreAnterior + '"', function (err, rows, field) {
    if (err) throw err
    res.send(req.body);
  })
})
var port = process.env.port || 8080;

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

app.listen(port, () => console.log('Example app listening on port 8080!'))