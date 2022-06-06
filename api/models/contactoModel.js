const mongoose = require('mongoose');

const contactoModel=mongoose.Schema({
    _id:       mongoose.Schema.Types.ObjectId,
    telemovel: {type: String, required: true}, 
    email:     {type: String, required: true},
    empresa:   {type: mongoose.Schema.Types.ObjectId, ref: 'empresa',required: true}, 
    
})

module.exports= mongoose.model('contacto',contactoModel);