const mongoose = require('mongoose');//biblioteca para lidar com mongoDB
const empresaModel = require('../models/empresaModel')
const bcrypt = require('bcrypt');//boiblioteca para  criptografar a password
const jwt = require('jsonwebtoken')


exports.registarEmpresa=(req,res,next)=>{
    const empresa = new empresaModel({
        _id: new mongoose.Types.ObjectId(),
        nome:                        req.body.nome,
        cod_actiividade_economica:   req.body.cod_actiividade_economica,
        ordem_ucursal:               req.body.ordem_ucursal,
        nuit:                        req.body.nuit,
        area_fiscal:                 req.body.area_fiscal,
        num_entrada:                 req.body.num_entrada,
        num_isercao:                 req.body.num_isercao
    });
    empresa
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Empresa Registada" ,
            empresa: {
                nome: result.nome,
                num_entrada:      result.num_entrada,
                GET_URL: 'http://localhost:4000/empresa/'+result._id
            }
        });
    })
    .catch(err=>{
        res.status(500).json({
          dic: "estes campos sao fortemente validados insira o tipo de dado correcto e garanta a inclusao de todos campos",
          erro:err  
        })
    });
}
exports.listarEmpresas=(req,res,next)=>{
    empresaModel.find()
    .select('nome area_fiscal nuit')
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            usr: doc.map(doc=>{
                return{
                    id: doc._id,
                    nome: doc.nome,
                    nuit: doc.nuit,
                    area_fiscal: doc.area_fiscal,
                    SPECIFIC_GET_URL: 'http://localhost:4000/users/'+doc._id
                }
            })
        }
       console.log("da base de dados",doc) ;
       //res.status(200).json(resposta.usr);
       res.status(200).json(resposta.usr);
       
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}
exports.eliminarEmpresa=(req,res,next)=>{
    //eliminar por _id
    empresaModel.remove({_id:req.params._id})
    .exec()
    .then( result=> {
            res.status(200).json({
                message : "Empresa eliminada",
                result: result
            })
        }
    )
    .catch(err=>{
        res.status(500).json({
            message: "Ocorreu algum erro",
            erro: err
        })
    })
    
}
exports.actualizarEmpresa=(req,res,next)=>{
     /*
      Passe o _id como parametro na url, 
      assim: http://localhost:4000/empresa/actualizar/_id  e
      forne??a o nome do atributo que pretende alterar no campo propName e seu novo valor no campo value
      em forma de lista, assim: 
      [
        {
            propName: nome,
            value: Mozal
        }
      ]
    */ 
    const id = req.params._id; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    empresaModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Empresa actualizada" ,
                produto_actualizado: {
                    nome: result.nome,
                    nuit: result.nuit,
                    GET_URL: 'http://localhost:4000/empresa/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}