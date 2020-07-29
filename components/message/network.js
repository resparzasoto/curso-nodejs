const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);
    res.header("custom-header", "valor personalizado");
    response.success(req, res, 'Lista de Mensajes');
});
router.post('/', (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);

    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch((e) => {
            response.error(req, res, e, 500, 'Error en el controller');
        });
});
router.delete('/', (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);
    response.success(req, res, 'Eliminado correctamente');
});

module.exports = router;