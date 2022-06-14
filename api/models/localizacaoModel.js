const mongoose = require('mongoose');

const localizacaoModel=mongoose.Schema({
    _id:          mongoose.Schema.Types.ObjectId,
    empresa:       {type: mongoose.Schema.Types.ObjectId, ref: 'empresa',required: true},
    provincia:     {type: String, required: true}, 
    distrito:      {type: String, required: true},
    bairro:        {type: String, required: true}, 
    avenida:       {type: String, required: true},
    edificio_num:  {type: String, required: true},
    andar:         {type: String, required: true}
})

module.exports= mongoose.model('localizacao',localizacaoModel);