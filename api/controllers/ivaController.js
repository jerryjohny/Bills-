const mongoose = require('mongoose');
const ivaController = require('../models/ivaModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ivaModel = require('../models/ivaModel');


exports.registarIva=(req,res,next)=>{
    const iva = new ivaModel({
        _id: new mongoose.Types.ObjectId(),
        valor_em_vigor:  req.body.valor_em_vigor,
        data: req.body.data
    });
    iva
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Novo IVA Registado" ,
            empresa: {
                valor_em_vigor: result.valor_em_vigor,
                data:      result.data,
                GET_URL: 'http://localhost:4000/iva/'+result._id
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
exports.listarIva=(req,res,next)=>{
    ivaModel.find()
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            usr: doc.map(doc=>{
                return{
                    id: doc._id,
                    valor_em_vigor: doc.valor_em_vigor,
                    data: doc.data,
                    SPECIFIC_GET_URL: 'http://localhost:4000/iva/'+doc._id
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

exports.actualizarIva=(req,res,next)=>{
     /*
      Passe o _id como parametro na url, 
      assim: http://localhost:4000/iva/actualizar/_id  e
      forneça o nome do atributo que pretende alterar no campo propName e seu novo valor no campo value
      em forma de lista, assim: 
      [
        {
            propName: valor,
            value: 0.18
        }
      ]
    */ 
    const id = req.params._id; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    ivaModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Taxas de IVA actualizada" ,
                IVA: {
                    valor_em_vigor: result.valor_em_vigor,
                    data: result.data,
                    GET_URL: 'http://localhost:4000/iva/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}