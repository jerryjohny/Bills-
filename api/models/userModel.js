const mongoose = require('mongoose');

const userModel=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: String,
    tipo: String,
    email: {
        type: String,
        required: true,
        unique:true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    }, 
    password: {type: String, required: true}
})

module.exports= mongoose.model('user',userModel);