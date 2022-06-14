const express= require('express');
const router = express.Router();//para os métodos REST
const userController= require('../controllers/userController')

router.post('/registar',userController.registar);
router.post('/autenticar',userController.autenticar)
router.get('/listar',userController.listar);
router.delete('/eliminar/:_id',userController.eliminar);
router.patch('/actualizar/:_id',userController.actualizar_usuario);



module.exports= router