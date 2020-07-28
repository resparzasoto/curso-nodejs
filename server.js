const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const response = require('./network/response');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

router.get('/message', (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);
    res.header("custom-header", "valor personalizado");
    response.success(req, res, 'Lista de Mensajes');
});
router.post('/message', (req, res) => {
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
router.delete('/message', (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);
    response.success(req, res, 'Eliminado correctamente');
});

app.use('/app', express.static('public'));

app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');