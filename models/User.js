const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true // remove extra spaces
    },
    email:{
        type:String,
        required:true,
        uniquie:true,
        lowercase:true,
        trim:true
    },
    age:{
        type:Number,
        min: 0 // age cannot be negative
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',userSchema); //'User' means 