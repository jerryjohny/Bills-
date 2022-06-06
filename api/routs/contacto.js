const express= require('express');
const router = express.Router();//para os métodos REST
const contactoController= require('../controllers/contactoController')

router.post('/registar',contactoController.registarContacto);
router.get('/listar',contactoController.listarContactos);
router.patch('/actualizar',contactoController.editarContacto);
router.delete('/eliminar/:_id',contactoController.eliminarContacto);


module.exports= router