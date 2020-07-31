const Model = require('./model');

const addUser = (user)  => {
    const myUser = new Model(user);
    return myUser.save();
}

module.exports = {
    add: addUser,
};