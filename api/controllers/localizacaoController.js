const mongoose = require('mongoose');//biblioteca para lidar com mongoDB
const localizacaoModel = require('../models/localizacaoModel')
const bcrypt = require('bcrypt');//boiblioteca para  criptografar a password
const jwt = require('jsonwebtoken')


exports.registarLocalizacao=(req,res,next)=>{
    const localizacao = new localizacaoModel({
        _id: new mongoose.Types.ObjectId(),
        empresa:  req.body.empresa,
        provincia:    req.body.provincia,
        distrito: req.body.distrito,
        bairro: req.body.bairro,
        avenida: req.body.avenida,
        edificio_num: req.body.edificio_num,
        andar: req.body.andar
    });
    localizacao
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Localizacao Registada" ,
            localizacao: {
                provincia: result.provincia,
                distrito:      result.distrito,
                GET_URL: 'http://localhost:4000/localizacao/'+result._id
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
exports.listarLocalizacao=(req,res,next)=>{
    localizacaoModel.find()
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            usr: doc.map(doc=>{
                return{
                    id: doc._id,
                    provincia:    doc.provincia,
                    distrito:     doc.distrito,
                    bairro:       doc.bairro,
                    avenida:      doc.avenida,
                    edificio_num: doc.edificio_num,
                    andar: doc.andar,
                    SPECIFIC_GET_URL: 'http://localhost:4000/localizacao/'+doc._id
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
exports.eliminarLocalizacao=(req,res,next)=>{
    //eliminar por _id
    localizacaoModel.remove({_id:req.params._id})
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
            propName: provincia,
            value: Maputo
        }
      ]
    */ 
    const id = req.params._id; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    localizacaoModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Localizacao actualizada" ,
                localizacao: {
                    provincia: result.provincia,
                    distrito: result.distrito,
                    GET_URL: 'http://localhost:4000/localizacao/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}