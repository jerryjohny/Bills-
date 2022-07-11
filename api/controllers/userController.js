const mongoose = require('mongoose');//biblioteca para lidar com mongoDB
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');//boiblioteca para  criptografar a password
const jwt = require('jsonwebtoken')

exports.registar=(req,res,next)=>{
    userModel.find({email: req.body.email}).exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message: "email já existe na abase de dados"
            })
        }else{
            bcrypt.hash(req.body.password, 10,(err,hash)=>{

                if(err){
                    return res.status(500).json({ 
                        error:err
                    })
                }else{
                    const user = new userModel({
                        _id: new mongoose.Types.ObjectId(),
                        nome:     req.body.nome,
                        tipo:     req.body.tipo,
                        email:    req.body.email,
                        // password: hash
                        password: req.body.password
                    }); 
                    user
                    .save()
                    .then(result=>{
                        console.log(result);
                        res.status(200).json({ 
                            message: "Novo usuario" ,
                            user: {
                                id:       result._id,
                                nome:     result.nome,
                                tipo:     result.tipo,
                                email:    result.email,
                                password: result.password,
                                GET_URL: 'http://localhost:4000/users/'+result._id
                            }
                        });
                    })
                    .catch(err=>{
                        res.status(500).json({
                        hint: "estes campos sao fortemente validados insira o tipo de dado correcto e garanta a inclusao de todos campos",
                        erro:err  
                        })
                    }); 
                 }
            })
        }
    })
}

exports.autenticar=(req,res,next)=>{

    userModel.find({email: req.body.email})
    .exec()
    .then(user=> {

        if(user.length < 1){
            res.status(401).json({
                message: "autenticação falhou"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message: "autenticação falhou2"
                })
            }
            if(result){
                const token= jwt.sign(
                    {
                      email: user[0].email,
                      userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    } 
                );
               return res.status(200).json({
                   message: "sucesso",
                   token:token
               })
            }
   
            return res.status(401).json({
               message: "autenticação falhou3"
           })
        }); 
        
    })
    .catch(err=>{console.log("erro generico")})
}

exports.listar=(req,res,next)=>{
    userModel.find()
    .select('nome tipo email password')
    .exec()
    .then(doc=>{
        const resposta={
            count: doc.length,
            usr: doc.map(doc=>{
                return{
                    id: doc._id,
                    nome: doc.nome,
                    tipo: doc.tipo,
                    email: doc.email,
                    password: doc.password,
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

exports.eliminar=(req,res,next)=>{
    //eliminar por _id
    userModel.remove({_id:req.params._id})
    .exec()
    .then( result=> {
            res.status(200).json({
                message : "Usuário eliminado",
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

exports.actualizar_usuario=(req,res,next)=>{
     /*
      Passe o _id como parametro na url, 
      assim: http://localhost:4000/user/actualizar/_id  e
      forneça o nome do atributo que pretende alterar no campo propName e seu novo valor no campo value
      em forma de lista, assim: 
      [
        {
            propName: email,
            value: vera@gmail.com
        }
      ]
    */ 
    const id = req.params._id; 
    const updateOps={};

    for(const ops of req.body ){
       updateOps[ops.propName] = ops.value;
    }
    userModel.update({_id: id},{$set:updateOps})
     .exec()
     .then(result=> {
            res.status(200).json({
                message: "Usuário actualizado" ,
                produto_actualizado: {
                    name: result.name,
                    price: result.price,
                    GET_URL: 'http://localhost:4000/products/'+id
                }
            })
        })
     .catch(err=>{
         console.log(err);
         res.status(500).json({error:err})
      })
}