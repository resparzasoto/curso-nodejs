const store = require('./store');

const addUser = (name) => {
    if (!name) {
        return Promise.reject('Invalid name');
    }

    const user = {
        name,
    };

    return store.add(user);
}

const getUsers = (filterName) => {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterName));
    });
}

module.exports = {
    addUser,
    getUsers,
};