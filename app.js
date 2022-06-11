const morgan = require('morgan');
const express = require('express');
const app= express();
const rota_usuarios= require('./api/routs/Users');
const rota_contactos= require('./api/routs/contacto');
const rota_localizacao= require('./api/routs/localizacao');
const rota_declaracao= require('./api/routs/declaracao');
const rota_pagamento= require('./api/routs/pagamento');
const rota_empresa= require('./api/routs/empresa');
const rota_iva= require('./api/routs/iva');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//conexão com mongodb 
mongoose.connect('mongodb+srv://jerry:'+process.env.password+'@funds.j0vmf.mongodb.net/bills_db?retryWrites=true&w=majority'
);


//controlador de logs
app.use(morgan('dev'));

//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Headers para prevenção de CORS errors
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-Type");
    res.header("Access-Controll-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept, Authorization");
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT','POST','PATCH','DELETE','GET');
     return res.status(200).json({});
    }
    next();
});

//rotas concretas

app.use('/user',rota_usuarios);
app.use('/contacto',rota_contactos);
app.use('/empresa',rota_empresa);
app.use('/iva',rota_iva);
app.use('/localizacao',rota_localizacao)
app.use('/declaracao',rota_declaracao)
app.use('/pagamento',rota_pagamento)

//rotas fall-back

app.use((req,res,next)=>{
    const error = new Error('Not ound');
    error.status= 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            nome: "jerry"
        }
    });
})


module.exports=app;