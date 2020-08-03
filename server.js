require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const chalk = require('chalk');

const db = require('./db');
const socket = require('./socket');
const router = require('./network/routes');

db.connect(process.env.DB_URI);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

socket.connect(server);

router(app);

app.use(process.env.PUBLIC_ROUTE, express.static('public'));

server.listen(process.env.PORT, () => {
    console.log(chalk.blueBright(`[server] La aplicación está escuchando en ${process.env.HOST}:${process.env.PORT}`));
});