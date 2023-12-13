const mongoose = require('mongoose')

const subscribeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,

    }
})

const subscribers = mongoose.model('subscribers',subscribeSchema)
module.exports = subscribers