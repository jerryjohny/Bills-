const express= require('express');
const router = express.Router();//para os métodos REST
const empresaController= require('../controllers/empresaController')

router.post('/registar',empresaController.registarEmpresa);
//router.get('/listar',contactoController.listarContactos);
//router.patch('/actualizar',contactoController.editarContacto);
//router.delete('/eliminar/:_id',contactoController.eliminarContacto);


module.exports= router