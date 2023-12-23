const { ObjectId } = require("mongodb")
const checks = require("../Model/checkOutSchema")
const homes = require("../Model/projectSchema")
const reviews = require("../Model/RatingSchema")

exports.yourHome = async(req,res)=>{
    const {productId,checkIn, checkOut,guests,booking,review}=req.body
    const userId = req.userId

   try {
    const newChecks = new checks({
        userId,productId,checkIn,checkOut,guests,booking,review
        
    })
    await newChecks.save()
   
    res.status(200).json({
        ...newChecks.toObject(),
        message:"success"
    })
   } 
   catch (error) {
    // console.error(error);
    res.status(500).json({
        message: "Internal server error",
        error: error.message
    })
    }
}

// to get
 exports.getChecks = async(req,res)=>{
    const userId = req.userId;

    try {
        // Check if there are any checks associated with the user
        const existingCheck = await checks.findOne({ userId: userId });
    
        if (existingCheck) {
          // Use the product ID from the existing check
          const productId = existingCheck.productId;
    
          // Retrieve the list of checks for the specific product
        //   const lists = await checks.find({ userId: userId, productId: productId });
          const populatedlist = await checks.find({userId:userId}).populate('productId')
          res.status(200).json({
        populatedlist
          });
        } else {
          res.status(404).json({
            message: "No checks found for the user.",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          error: error.message,
        });}
 }

 // to request an book

 exports.requestBooking = async(req,res)=>{
   const {id } =req.body
   try {
    await checks.findByIdAndUpdate({_id:id},{
      booking:true
    })
    res.status(200).json({
      message:"success"
    })
   } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
   }
 }

 // to editCheckin details
 exports.editChekinDates = async(req,res)=>{
   const {id,checkIn} = req.body
    try {
      const updatedCheckinDates =await checks.findByIdAndUpdate({_id:id},{
        checkIn
      },{new:true})
      res.status(200).json(updatedCheckinDates)
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
     }
    }

    // to edit checkOut details
    exports.editChekoutDate = async(req,res)=>{
      const {id,checkOut} = req.body
    try {
      const updatedCheckOutDates =await checks.findByIdAndUpdate({_id:id},{
        checkOut
      },{new:true})
      res.status(200).json(updatedCheckOutDates)
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
     }
    }

    // to edit guests
    exports.editGuestsNo = async(req,res)=>{
      const {id, guests} = req.body
    try {
      const updatedGuest =await checks.findByIdAndUpdate({_id:id},{
        guests
      },{new:true})
      res.status(200).json(updatedGuest)
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
     }
    }

    // to list user checked products id
 exports.listProductsUser =async(req,res)=>{
  const userId = req.userId
  
    try {
      const userBooked = await checks.find({ userId: userId, booking: true }).populate('productId');
      // console.log('userBooked:', userBooked);

      if (userBooked.length > 0) {
          res.status(200).json(userBooked);
      } else {
          res.status(204).json({
              message: "You Have No Booking"
          });
      }
  }
  catch (error) {
      res.status(500).json({
          message: "Internal server error",
          error: error.message,
      });
  }
    
 
 }

 // add review :yes

//  exports.reviewsChecks = async (req, res) => {
//   const userId = req.userId;
//   const { productId } = req.body;

//   try {
//     // Check if the user and property combination exists in the reviews collection
//     const existingReview = await reviews.findOne({
//       userId: userId,
//       propertyDetails: productId,
//     });

//     if (!existingReview) {
//       // If the user and property combination does not exist in reviews, return an error
//       return res.status(404).json({ message: 'No matching review found.' });
//     }

//     // Update the matching document in the checks collection
    
//   } catch (error) {
//     console.error('Error updating review:', error.message);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };
