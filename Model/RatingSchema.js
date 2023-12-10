const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const RatingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
  
    propertyDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"homes" 
    },
    rating:{
        type:Number
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
   dislikes:{
    type:Number,
    default:0
   },
   suggestion:{
    type:String
   }
})

const reviews = mongoose.model('reviews',RatingSchema)
module.exports = reviews