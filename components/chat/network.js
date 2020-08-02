const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/', (req, res) => {
    controller.addChat(req.body.users)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.get('/:userId', (req, res) => {
    controller.listChats(req.params.userId)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;