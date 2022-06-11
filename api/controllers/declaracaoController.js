const mongoose = require('mongoose');//biblioteca para lidar com mongoDB
const declaracaoModel = require('../models/declaracaoModel')
const bcrypt = require('bcrypt');//boiblioteca para  criptografar a password
const jwt = require('jsonwebtoken')


exports.registarDeclaracao=(req,res,next)=>{
    const declaracao = new declaracaoModel({
        _id: new mongoose.Types.ObjectId(),
        empresa:  req.body.empresa,
        tipo_declaracao:    req.body.tipo_declaracao,
        num_entrada: req.body.num_entrada,
        num_insercao: req.body.num_insercao
    });
    declaracao
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Declaracao Registada" ,
            localizacao: {
                tipo_declaracao: result.tipo_declaracao,
                empresa:      result.empresa,
                GET_URL: 'http://localhost:4000/declaracao/'+result._id
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
exports.listarDeclaracao=(req,res,next)=>{
    declaracaoModel.find()
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            usr: doc.map(doc=>{
                return{
                    id: doc._id,
                    empresa:    doc.empresa,
                    tipo_declaracao:     doc.tipo_declaracao,
                    num_entrada:       doc.num_entrada,
                    num_insercao:      doc.num_insercao,
                    edificio_num: doc.edificio_num,
                    SPECIFIC_GET_URL: 'http://localhost:4000/declaracao/'+doc._id
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
exports.eliminarDeclaracao=(req,res,next)=>{
    //eliminar por _id
    declaracaoModel.remove({_id:req.params._id})
    .exec()
    .then( result=> {
            res.status(200).json({
                message : "Localizacao eliminada",
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
exports.actualizarLocalozacao=(req,res,next)=>{
     /*
      Passe o _id como parametro na url, 
      assim: http://localhost:4000/empresa/actualizar/_id  e
      forneça o nome do atributo que pretende alterar no campo propName e seu novo valor no campo value
      em forma de lista, assim: 
      [
        {
            propName: tipo_declaracao,
            value: "..."
        }
      ]
    */ 
    const id = req.params._id; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    declaracaoModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Localizacao actualizada" ,
                localizacao: {
                    tipo_declaracao: result.tipo_declaracao,
                    GET_URL: 'http://localhost:4000/localizacao/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}