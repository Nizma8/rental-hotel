const reviews = require("../Model/RatingSchema")
const checks = require("../Model/checkOutSchema")

exports.ReviewController =async(req,res)=>{
const {propertyDetails,rating,title,description,date,likes,dislikes,suggestion}  = req.body
const userId = req.userId
try {
  // Check whether this user bought this home
  const userBuyHome = await checks.findOne({
    productId: propertyDetails,
    userId: userId,
    booking: true,
  });
  // Check if a review already exists for this user and property
  const existingReview = await reviews.findOne({
    propertyDetails: propertyDetails,
    userId: userId,
  });

  if (userBuyHome && !existingReview) {
    const newReview = new reviews({
      userId,
      propertyDetails,
      rating,
      title,
      description,
      date,
      likes: 0,
      dislikes: 0,
      suggestion
    });

    // Save the new review to the database
    const savedReview = await newReview.save();
    const updatedCheck = await checks.findOneAndUpdate(
      { userId: userId, productId: propertyDetails, booking: true },
      { review: true },
      { new: true }
    );
    // Send the updated check as a response
    res.status(200).json(savedReview);
  } else if (!userBuyHome) {
    res.status(400).json({
      message: "You are not allowed to review this home.",
    });
  } else if (existingReview) {
    res.status(400).json({
      message: "You have already reviewed this home.",
    });
  }
} catch (error) {
  res.status(500).json({
    message: "Internal server error",
  });
  // console.log(error);
}

}

exports.getReviewController = async(req,res)=>{
  const userId = req.userId 
  try{const existingRewiedHome = await reviews.find({userId})
  if(existingRewiedHome.length>0){
    res.status(200).json(existingRewiedHome)
  }else{
    res.status(204).json("NO Reviews ")
  }}
  catch(error){
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

// filter review based on product id
exports.filterReviewsController = async(req,res)=>{
  const userId = req.userId
  const {id}= req.params
  
try{  const filteredReviews = await reviews.find({propertyDetails:id}).populate('userId')
       if(filteredReviews.length>0){
        res.status(200).json(filteredReviews)
       }else{
        res.status(204).json("NO Reviews")
       }
}
catch(error){
  res.status(500).json({
    message: "Internal server error",
  });

}
}

// to get each review 

exports.getEachReviewController = async(req,res)=>{

  const { id } = req.params;
  try{const existingReview =await  reviews.findById(id)
  console.log(existingReview);
  if(existingReview){
    res.status(200).json(existingReview)
  }}catch(error){
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      
    });
  }
}

// to edit review

exports.EditReview = async(req,res)=>{
  const {id} = req.params
  const {rating,title,description,suggestion} = req.body
try {
  const editedDetails = await reviews.findByIdAndUpdate({_id:id},{
    rating,
    title,
    description,suggestion
  },{new:true})
  res.status(200).json(editedDetails)
} catch (error) {
  console.log(error);
  res.status(500).json({
    message: "Internal server error",
    
  });
}
}

