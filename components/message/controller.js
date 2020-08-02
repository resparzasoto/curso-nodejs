const chalk = require('chalk');
const store = require('./store');

const addMessage = (chat, user, message, file) => {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error(`${chalk.red('[messageController]')} No hay chat, mensaje o usuario`);
            return reject('Información invalida');
        }

        let fileUrl= '';
        if (file) {
            fileUrl = 'http://localhost:3000/app/files/' + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        };

        store.add(fullMessage);

        return resolve(fullMessage);
    });
}

const getMessages = (filterMessages) => {
    return store.list(filterMessages);
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