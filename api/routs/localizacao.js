const express= require('express');
const router = express.Router();//para os métodos REST
const localizacaoController= require('../controllers/localizacaoController')

router.post('/registar',localizacaoController.registarLocalizacao);
router.get('/listar',localizacaoController.listarLocalizacao);
router.patch('/actualizar/:_id',localizacaoController.actualizarLocalozacao);
router.delete('/eliminar/:_id',localizacaoController.eliminarLocalizacao);


module.exports= router