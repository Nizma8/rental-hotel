const mongoose = require('mongoose')

const WishListSchema= new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'homes'
    },
    userId:{
        type:String,
        required:true
    }
})
const wishlists = mongoose.model('wishlists',WishListSchema)
module.exports = wishlists