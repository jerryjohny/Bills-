const mongoose = require('mongoose');

const pagamentoModel=mongoose.Schema({
    _id:            mongoose.Schema.Types.ObjectId,
    tipo:          {type: String, required: true},
    forma:         {type: String, required: true},
    outro:         {type: String, required: true},
    valor_a_pagar: {type: String, required: true}

})

module.exports= mongoose.model('pagamento',pagamentoModel);