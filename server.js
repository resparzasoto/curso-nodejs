const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const chalk = require('chalk');

const db = require('./db');
const socket = require('./socket');
const router = require('./network/routes');

const secretConnection = db.getSecretConnection('telegrom');
db.connect(secretConnection.connectionString);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

socket.connect(server);

router(app);

app.use('/app', express.static('public'));

server.listen(3000, () => {
    console.log(chalk.blueBright('[server] La aplicación está escuchando en http://localhost:3000'));
});