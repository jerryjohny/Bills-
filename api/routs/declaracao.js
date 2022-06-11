const express= require('express');
const router = express.Router();//para os métodos REST
const declaracaoController= require('../controllers/declaracaoController')

router.post('/registar',declaracaoController.registarDeclaracao);
router.get('/listar',declaracaoController.listarDeclaracao);
router.patch('/actualizar/:_id',declaracaoController.actualizarLocalozacao);
router.delete('/eliminar/:_id',declaracaoController.eliminarDeclaracao);


module.exports= router