const reviews = require("../Model/RatingSchema")
const checks = require("../Model/checkOutSchema")

exports.ReviewController =async(req,res)=>{
const {propertyDetails,rating,title,description,date,likes,dislikes,suggestion}  = req.body
console.log(propertyDetails+"property details");
const userId = req.userId
console.log(userId+"userId");
try {
  // Check whether this user bought this home
  const userBuyHome = await checks.findOne({
    productId: propertyDetails,
    userId: userId,
    booking: true,
  });
console.log(userBuyHome);
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
  console.error(error);
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
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}