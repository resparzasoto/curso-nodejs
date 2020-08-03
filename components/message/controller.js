const chalk = require('chalk');
const store = require('./store');
const { socket } = require('../../socket');

const addMessage = (chat, user, message, file) => {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error(`${chalk.red('[messageController]')} No hay chat, mensaje o usuario`);
            return reject('Información invalida');
        }

        let fileUrl = '';
        if (file) {
            fileUrl = `${process.env.HOST}:${process.env.PORT}${process.env.PUBLIC_ROUTE}${process.env.FILES_ROUTE}/` + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        };

        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        return resolve(fullMessage);
    });
}

const getMessages = (filterChat) => {
    return store.list(filterChat);
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
        if (!id) {
            return reject('Id invalido');
        }

        store.remove(id)
            .then(() => {
                return resolve();
            })
            .catch(e => {
                return reject(e);
            });
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};