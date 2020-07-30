const Model = require('./model');

const addMessage = (message) => {
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessages = async (filterUser) => {
    let filter = {};

    if (filterUser !== null) {
        filter = { user: new RegExp(filterUser, 'i') };
    }

    const messages = await Model.find(filter);
    return messages;
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