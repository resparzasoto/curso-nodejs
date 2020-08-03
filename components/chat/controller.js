const chalk = require('chalk');
const store = require('./store');

const addChat = (users) => {
    if (!users || !Array.isArray(users)) {
        console.error(`${chalk.red('[messageController]')} Usuarios inválidos`);
        return Promise.reject('Invalid user list');
    }

    const chat = {
        users: users,
    };

    return store.add(chat);
}

const listChats = (userId) => {
    return store.list(userId);
}

module.exports = {
    addChat,
    listChats,
};