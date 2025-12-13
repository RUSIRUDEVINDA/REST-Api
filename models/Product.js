const  mongoose = require('mongoose');
const productSchema = new mongoose.Schema({


name:{
    type:String,
    required:true,
    trim:true //removes whitespace
},

price:{
    type:Number,
    required:true,
    min:0
},

category:{
    type:String,
    required:true,
    trim:true
},
 // Reference to User (who created the product)
 owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
 },
 
  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports=mongoose.model('Product',productSchema);




