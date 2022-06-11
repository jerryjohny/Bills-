const express= require('express');
const router = express.Router();
const ivaController= require('../controllers/ivaController')

router.post('/registar',ivaController.registarIva);
router.get('/listar',ivaController.listarIva);
router.patch('/actualizar/:_id',ivaController.actualizarIva);


module.exports= router