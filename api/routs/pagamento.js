const express= require('express');
const router = express.Router();//para os métodos REST
const pagamentoController= require('../controllers/pagamentoController')

router.post('/registar',pagamentoController.registarPagamento);
router.get('/listar',pagamentoController.listarPagamento);
router.patch('/actualizar/:_id',pagamentoController.actualizarPagamento);
router.delete('/eliminar/:_id',pagamentoController.eliminarPagamento);


module.exports= router