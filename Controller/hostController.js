const Host = require("../Model/hostSchema")



exports.hostLogin = async (req, res) => {
console.log("inside host login");
  try {
    const existingUser = await Host.findOne({ userId:req.userId });

    if (existingUser) {
      res.status(201).json({
        message: "Welcome Back!!",
      });
    } else {
      const newHost = new Host({
        ...existingUser,
        userId:req.userId,
        role:req.role,
        
      });

      await newHost.save();

      res.status(200).json({
        ...newHost.toJSON(),
        message: "You are a host now",
      });
    }
  } catch (error) {
    res.status(401).json(`Transaction failed: ${error}`);
    
  }
};
