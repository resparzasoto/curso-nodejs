const chalk = require('chalk');
const store = require('./store');

const addChat = (users) => {
    return new Promise((resolve, reject) => {
        if (!users) {
            console.error(`${chalk.red('[messageController]')} No hay usuarios`);
            return reject('Información invalida');
        }

        const newChat = { users: users };

        return resolve(store.add(newChat));
    });
}

const getChats = () => {
    return new Promise((resolve, reject) => {
        store.list()
            .then(data => {
                return resolve(data);
            })
            .catch(e => {
                return reject(e);
            });
    });
}

module.exports = {
    addChat,
    getChats,
};