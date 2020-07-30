const mongoose = require('mongoose');
const chalk = require('chalk');

const secrets = require('./secrets.json');

const getSecretConnection = name => {
    const connection = secrets.connectionStrings.find(connection => connection.name === name);
    return connection;
}

const connect = connectionString => {
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

const db = mongoose.connection;
db.once('open', console.log.bind(console, chalk.green('[db] Conectada con éxito')));
db.on('error', console.error.bind(console, chalk.red('[db] Error de conexión')));

module.exports = {
    getSecretConnection,
    connect,
};