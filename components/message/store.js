const Model = require('./model');

const addMessage = (message) => {
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessages = async (filterUser) => {
    return new Promise((resolve, reject) => {
        let filter = {};

        if (filterUser !== null) {
            filter = { user: new RegExp(filterUser, 'i') };
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