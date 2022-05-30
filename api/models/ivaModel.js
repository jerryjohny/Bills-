const mongoose = require('mongoose');

const ivaModel=mongoose.Schema({
    _id:            mongoose.Schema.Types.ObjectId,
    valor_em_vigor: {type: Number, required:true, default: 0.17}, 
    data:           {type: Number, required}
})

module.exports= mongoose.model('iva',ivaModel);