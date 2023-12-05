const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productImage:{
        type:String,
        required:true,
        unique:true
    },
    chooseType:{
        type:String,
        required:true
    },
    amenities: {
        type: [String], // Array of strings
        required: true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
    },
    bedCount:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    hostId:{
        type:String,
        required:true
    }

})

ProductSchema.index({ productImage: 1, name: 1 }, { unique: true });

const homes =  mongoose.model('homes',ProductSchema)
module.exports = homes