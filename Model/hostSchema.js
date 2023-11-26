const mongoose = require('mongoose')

const hostSchema = new mongoose.Schema({
    
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'users'

    },role:{
        type:String,
        default:'host'
    }
   
})


const Host = mongoose.model("hosts", hostSchema);
module.exports = Host;