const mongoose = require('mongoose');
const chalk = require('chalk');

const connect = (dbUrl) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

const db = mongoose.connection;
db.once('open', console.log.bind(console, chalk.green('[db] Conectada con éxito')));
db.on('error', console.error.bind(console, chalk.red('[db] Error de conexión')));

module.exports = {
    connect,
};