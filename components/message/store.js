const mongoose = require('mongoose');
const Model = require('./model');
const chalk = require('chalk');

const secrets = require('../../secrets.json');
const connection = secrets.connectionStrings.find((connection) => connection.name === 'telegrom');

mongoose.Promise = global.Promise;
mongoose.connect(connection.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', console.log.bind(console, chalk.green('[db] Conectada con éxito')));
db.on('error', console.error.bind(console, chalk.red('[db] Error de conexión')));

const addMessage = (message) => {
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessages = async () => {
    const messages = await Model.find();
    return messages;
}

const updateText = async (id, message) => {
    const update = { message: message };
    const updateMessage = await Model.findByIdAndUpdate(id, update, { new: true });
    return updateMessage;
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    //get
    //delete
};