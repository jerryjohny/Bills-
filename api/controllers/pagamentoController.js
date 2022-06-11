const mongoose = require('mongoose');//biblioteca para lidar com mongoDB
const pagamentoModel = require('../models/pagamentoModel')
const bcrypt = require('bcrypt');//boiblioteca para  criptografar a password
const jwt = require('jsonwebtoken')


exports.registarPagamento=(req,res,next)=>{
    const pagamento = new pagamentoModel({
        _id: new mongoose.Types.ObjectId(),
        tipo:          req.body.tipo,
        forma:         req.body.forma,
        outro:         req.body.outro,
        valor_a_pagar: req.body.valor_a_pagar
    });
    pagamento
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Pagamento Registado" ,
            localizacao: {
                tipo:          result.tipo,
                valor_a_pagar: result.valor_a_pagar,
                GET_URL: 'http://localhost:4000/pagamento/'+result._id
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
exports.listarPagamento=(req,res,next)=>{
    pagamentoModel.find()
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            usr: doc.map(doc=>{
                return{
                    id: doc._id,
                    tipo:    doc.tipo,
                    forma:     doc.forma,
                    outro:       doc.outro,
                    valor_a_pagar:      doc.valor_a_pagar,
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
exports.eliminarPagamento=(req,res,next)=>{
    //eliminar por _id
    pagamentoModel.remove({_id:req.params._id})
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
exports.actualizarPagamento=(req,res,next)=>{
     /*
      Passe o _id como parametro na url, 
      assim: http://localhost:4000/empresa/actualizar/_id  e
      forneça o nome do atributo que pretende alterar no campo propName e seu novo valor no campo value
      em forma de lista, assim: 
      [
        {
            propName: tipo,
            value: Numerário
        }
      ]
    */ 
    const id = req.params._id; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    pagamentoModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Pagamento actualizado" ,
                localizacao: {
                    provincia: result.provincia,
                    distrito: result.distrito,
                    GET_URL: 'http://localhost:4000/pagamento/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}