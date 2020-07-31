const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500, e);
        });
});
router.get('/', (req, res) => {
    const filterName = req.query.name || null;
    controller.getUsers(filterName)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(res, res, 'Internal error', 500);
        });
});

module.exports = router;