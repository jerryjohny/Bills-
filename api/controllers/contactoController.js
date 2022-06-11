const mongoose = require('mongoose');//biblioteca para lidar com mongoDB
const contactoModel = require('../models/contactoModel')
const bcrypt = require('bcrypt');//boiblioteca para  criptografar a password
const jwt = require('jsonwebtoken')


exports.registarContacto=(req,res,next)=>{
    const contacto = new contactoModel({
        _id: new mongoose.Types.ObjectId(),
        telemovel:  req.body.telemovel,
        email:    req.body.email,
        empresa: req.body.empresa
    });
    contacto
    .save()
    .then(result=>{
        console.log(result);
        res.status(200).json({ 
            message: "Novo contacto" ,
            obra: {
                telemovel: result.telemovel,
                email:      result.email,
                empresa:    result.empresa,
                GET_URL: 'http://localhost:4000/contacto/'+result._id
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

exports.listarContactos=(req,res,next)=>{
    contactoModel.find()
    //.populate("empresa")
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            contacto: doc.map(doc=>{
                return{
                    _id:       doc._id,
                    telemovel: doc.telemovel,
                    email:     doc.email,
                    empresa:   doc.empresa,
                    SPECIFIC_GET_URL: 'http://localhost:4000/contacto/'+doc._id
                }
            })
        }
       console.log("da base de dados",doc) ;
       res.status(200).json(resposta.contacto);
    })
    .catch(err=>{ 
        console.log(err);
        res.status(500).json({error:err});
    });
}

exports.editarContacto=(req,res,next)=>{
    const id = req.params._id; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    contactoModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Contacto actualizado" ,
                contacto_actualizado: {
                    telemovel: result.designacao,
                    email: result.detalhes,
                    empresa: result.empresa
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}

exports.eliminarContacto=(req,res,next)=>{
    contactoModel.remove({_id:req.params._id})
    .exec()
    .then( result=> {
            res.status(200).json({
                message : "contacto eliminado",
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