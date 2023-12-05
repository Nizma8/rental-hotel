const Host = require("../Model/hostSchema");
const homes = require("../Model/projectSchema");
const users = require("../Model/userSchema");



exports.hostLogin = async (req, res) => {
// console.log("inside host login");
  
   const userId = req.userId
  //  console.log(userId);
   try {
    // Check if the user is an existing host
    const existingHost = await Host.findOne({ userId: req.userId });

    if (existingHost) {
      // If it's an existing host, update the user role to include 'host'
      const updatedUser = await users.findOneAndUpdate(
        { _id: req.userId },
        { $addToSet: { role: 'host' } },
        { new: true }
      );

      return res.status(201).json({
        ...updatedUser.toJSON(),
        message: "Welcome Back!!",
      });
    }

    // If not an existing host, create a new Host document
    const newHost = new Host({
      userId: req.userId,
    });

    // Save the new Host document
    await newHost.save();

    // Update the user role to include 'host'
    const updatedUser = await users.findOneAndUpdate(
      { _id: req.userId },
      { $addToSet: { role: 'host' } },
      { new: true }
    );

    res.status(200).json({
      ...updatedUser.toJSON(),
      message: "You are a host now",
    });
  } catch (error) {
    // console.error('Error during update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// to get which users tre host

exports.togetUserDetails = async(req,res)=>{
  const userId = req.userId

  try {
    // console.log("inside togetuser");
    const findhost = await Host.findOne({userId:userId})
    // console.log(findhost);
    if(findhost){
      const hostFind = await homes.find({hostId:findhost._id})
      if(hostFind.length>0){
        res.status(200).json(hostFind)

      }else{
        res.status(204).json({
          message:"No Homes Rented Yet.."
        })
      }
    } else {
      res.status(404).json({ message: 'User is not a host' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });

  }
}


