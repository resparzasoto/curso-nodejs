const express = require('express');

var app = express();

app.use('/', (req, res) => res.send('Hola Mundo'));

app.listen(3000);
console.log('La aplicacion esta escuchando en http://localhost:3000');