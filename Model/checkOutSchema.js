const mongoose = require('mongoose')
 const checkOutSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"homes"
    },
    checkIn:{
        type:Date,
        required:true,
        
    },
    checkOut:{
        type:Date,
        required:true,
        
    },
    guests:{
        type:String,
        required:true
    },
    booking:{
        type:Boolean,
        default:false
    },
    homeDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "homes"
    }

 })

 const checks = mongoose.model('checks',checkOutSchema)
 module.exports = checks