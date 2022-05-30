const mongoose = require('mongoose');

const empresaModel=mongoose.Schema({
    _id:                      mongoose.Schema.Types.ObjectId,
    nome:                     {type: String, required: true}, 
    cod_actiividade_economica:{type: String, required: true},
    ordem_ucursal:            {type: String, required: true}, 
    nuit:                     {type: String, required: true},
    area_fiscal:              {type: String, required: true},
    num_entrada:              {type: String, required: true},
    num_isercao:              {type: String, required: true}

})

module.exports= mongoose.model('empresa',empresaModel);