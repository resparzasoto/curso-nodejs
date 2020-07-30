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

const getMessages = (filterUser) => {
    return new Promise((resolve, reject) => {
        return resolve(store.list(filterUser));
    });
}

const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            console.error(`${chalk.red('[messageController]')} No hay id o mensaje`);
            return reject('Información invalida');
        }

        const result = await store.updateText(id, message);

        return resolve(result);
    });
}

const deleteMessage = (id) => {
    return new Promise((resolve, reject) => {
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};