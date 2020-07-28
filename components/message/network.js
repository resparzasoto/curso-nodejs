const express = require('express');
const response = require('../../network/response');

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
    if (req.query.error === 'ok') {
        response.error(req, res, 'Error inesperado', 500, 'Es solo una simulación de los errores');
    }
    else {
        response.success(req, res, 'Creado correctamente', 201);
    }
});
router.delete('/', (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);
    response.success(req, res, 'Eliminado correctamente');
});

module.exports = router;