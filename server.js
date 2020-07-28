const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

router.get('/message', (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.body);
    res.header("custom-header", "valor personalizado");
    res.send('Lista de Mensajes')
});
router.post('/message', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    res.status(201).send({error: '', mensaje: `Mensaje ${req.body.text} creado correctamente`})
});
router.delete('/message', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    res.send(`Mensaje ${req.body.text} eliminado correctamente`);
});

app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');