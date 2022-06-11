const mongoose = require('mongoose');

const ivaModel=mongoose.Schema({
    _id:            mongoose.Schema.Types.ObjectId,
    valor_em_vigor: {type: Number, required:true}, 
    data:           {type: String, required:true}
})

module.exports= mongoose.model('iva',ivaModel);