const express = require('express');

const db = require('./db');
const router = require('./network/routes');

const secretConnection = db.getSecretConnection('telegrom');
db.connect(secretConnection.connectionString);

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');