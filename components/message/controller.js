const store = require('./store');
const chalk = require('chalk');

const addMessage = (user, message) => {
    return new Promise((resolve, reject) => {
        if (!user || !message) {
            console.error(`${chalk.red('[messageController]')} No hay usuario o mensaje`);
            return reject('Información invalida');
        }

        const fullMessage = {
            user: user,
            message: message,
            date: new Date(),
        };

        store.add(fullMessage);

        return resolve(fullMessage);
    });
}

const getMessages = () => {
    return new Promise((resolve, reject) => {
        return resolve(store.list());
    });
}

module.exports = {
    addMessage,
    getMessages,
};