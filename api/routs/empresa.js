const express= require('express');
const router = express.Router();//para os métodos REST
const empresaController= require('../controllers/empresaController')

router.post('/registar',empresaController.registarEmpresa);
router.get('/listar',empresaController.listarEmpresas);
router.patch('/actualizar/:_id',empresaController.actualizarEmpresa);
router.delete('/eliminar/:_id',empresaController.eliminarEmpresa);


module.exports= router