const chalk = require('chalk');
const store = require('./store');

const addChat = (users) => {
    if (!users || !Array.isArray(users)) {
        console.error(`${chalk.red('[messageController]')} Usuarios invalidos`);
        return Promise.reject('Invalid user list');
    }

    const newChat = {
        users: users
    };

    return store.add(newChat);
}

const listChats = (userId) => {
    return new Promise((resolve, reject) => {
        store.list(userId)
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
    listChats,
};