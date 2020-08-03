const Model = require('./model');

const addMessage = (message) => {
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessages = async (filterChat) => {
    return new Promise((resolve, reject) => {
        let filter = {};

        if (filterChat !== null) {
            filter = { chat: filterChat };
        }

        Model.find(filter)
            .populate('user')
            .exec((e, populated) => {
                if (e) {
                    return reject(e);
                }

                return resolve(populated);
            });
    });
}

const updateText = async (id, message) => {
    const update = { message: message };
    const updateMessage = await Model.findByIdAndUpdate(id, update, { new: true });
    return updateMessage;
}

const deleteMessage = (id) => {
    return Model.findByIdAndDelete(id);
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: deleteMessage,
};