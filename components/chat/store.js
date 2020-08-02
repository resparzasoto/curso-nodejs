const Model = require('./model');

const addChat = (users) => {
    const newChat = new Model(users);
    return newChat.save();
}

const getChats = () => {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('users')
            .exec((e, populated) => {
                if (e) {
                    return reject(e);
                }

                return resolve(populated);
            });
    });
}

module.exports = {
    add: addChat,
    list: getChats,
};