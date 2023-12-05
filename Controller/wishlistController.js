const wishlists = require("../Model/wishlistSchema")

exports.wishListController=async(req,res)=>{
    userId = req.userId
 const  { productId} = req.body
console.log(req.params);
    const existingWishListProduct = await wishlists.findOne({productId:productId,userId:userId})
    if(existingWishListProduct){
        res.status(406).json({
            message:"Home is Already in your wishList.."
        })
    }
    else{
        try {
            const newWishLists = new wishlists({
                userId,
                productId
            })
            await newWishLists.save()
 
           res.status(200).json({
            ...newWishLists.toObject(),
             message:"home added to the wishlist..."
           })
        } catch (error) {
            res.status(400).json({
                message:error.message
            })
        }
    }
    
}

exports.getWishList = async (req,res)=>{
    const userId = req.userId;

    try {
      const existingUser = await wishlists.findOne({ userId: userId });
  
      if (!existingUser) {
        return res.status(404).json({
          message: "Wishlist not found for the user",
          success: false,
        });
      }
  
      const allWishListedHomes = await wishlists.find({ userId: userId });
      
      // You may use populate if productId is a reference to another model
      const populatedWishList = await wishlists.find({ userId: userId }).populate('productId');
  
      res.status(200).json({
        // wishlists: allWishListedHomes,
        populatedWishList: populatedWishList,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
}

exports.removeWishlist = async(req,res)=>{
  const {id} = req.params
 try{await wishlists.findByIdAndDelete({_id:id})
 res.status(200).json({
  message:"success"
 })}catch(err){
  res.status(500).json({
    message: err.message,
    success: false,
  });
}
 
}