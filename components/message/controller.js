const chalk = require('chalk');

const addMessage = (user, message) => {
    return new Promise((resolve, reject) => {
        if (!user || !message) {
            console.error(`${chalk.red('[messageController]')} No hay usuario o mensaje`);
            reject('Información invalida');
        }

        const fullMessage = {
            user: user,
            message: message,
            date: new Date(),
        };

        console.log(fullMessage);
        resolve(fullMessage);
    });
}

module.exports = {
    addMessage,
};