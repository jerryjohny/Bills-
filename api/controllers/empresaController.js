const mongoose = require('mongoose');//biblioteca para lidar com mongoDB
const empresaModel = require('../models/empresaModel')
const bcrypt = require('bcrypt');//boiblioteca para  criptografar a password
const jwt = require('jsonwebtoken')


exports.registarEmpresa=(req,res,next)=>{
    const empresa = new empresaModel({
        _id: new mongoose.Types.ObjectId(),
        nome:  req.body.nome,
        cod_actiividade_economica:    req.body.cod_actiividade_economica,
        ordem_ucursal: req.body.ordem_ucursal,
        nuit: req.body.nuit,
        area_fiscal: req.body.area_fiscal,
        num_entrada: req.body.num_entrada,
        num_isercao: req.body.num_isercao
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