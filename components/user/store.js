const Model = require('./model');

const addUser = (user)  => {
    const myUser = new Model(user);
    return myUser.save();
}

const listUsers = (filterName) => {
    let filter = {};

    if (filterName !== null) {
        filter = { name: new RegExp(filterName, 'i') };
    }

    return Model.find(filter);
}

module.exports = {
    add: addUser,
    list: listUsers,
};