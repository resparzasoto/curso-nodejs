const express = require('express');
const multer = require('multer');
const path = require('path')

const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `public${process.env.FILES_ROUTE}/`),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({
    storage: storage,
});

router.get('/', (req, res) => {
    const filterChat = req.query.chat || null;
    controller.getMessages(filterChat)
        .then(messageList => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500, e);
        });
});
router.post('/', upload.single('file'), (req, res) => {
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then(fullMessage => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Información invalida', 400, e);
        });
});
router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500, e);
        });
});
router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500, e);
        });
});

module.exports = router;