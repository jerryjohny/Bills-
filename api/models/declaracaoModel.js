const mongoose = require('mongoose');

const declaracaoModel=mongoose.Schema({
    _id:                      mongoose.Schema.Types.ObjectId,
    empresa:                  {type: mongoose.Schema.Types.ObjectId, ref: 'empresa',required: true}, 
    tipo_declaracao:          {type: String, required: true},
    num_entrada:              {type: String, required: true},
    num_isercao:              {type: String, required: true}

})

module.exports= mongoose.model('declaracao',declaracaoModel);