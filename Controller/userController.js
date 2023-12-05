const Host = require('../Model/hostSchema')
const users =require('../Model/userSchema')
const jwt = require('jsonwebtoken')
// register

exports.userRegister = async(req,res)=>{
    const {username,email,password}= req.body
    // find if there is any existing user
try  {const existingUser = await users.findOne({email})
     if(existingUser){
        res.status(400).json({
            message:'User Already Exists,Please Login!!'
        })
     }else{
        const newUsers = new users({
           ...req.body,
            isAdmin:false,
            roles:['user'],
            Adress:"",
            image:""


        })
        await newUsers.save()
        res.status(200).json({...newUsers.toObject(),message:"Registration successfull"})
     }}
     catch (err) {
        res.status(401).json(`Transaction failed${err}`);
      }
}

//to get all users

exports.togetAllUsers = async(req,res)=>{
    const userId =req.userId
 // check if this user is admin
 try{const isAdminUser = await users.findOne({_id:userId,isAdmin:true})
 if (isAdminUser) {
    // get all user information
    const allUsers = await users.find();
    res.status(200).json(allUsers);
  } else {
    // If the user making the request is not an admin, return unauthorized
    res.status(401).json({ message: 'Unauthorized' });
  }
} catch (error) {
  res.status(500).json({ message: 'Internal Server Error' });
}
}
//login 
exports.userLogin = async (req, res) => {
    // console.log("inside login function");
    const { email, password } = req.body;

    try {
        // Find the user by email
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            // Compare the provided password with the stored password
            if (password === existingUser.password) {
                // Generate and send a JWT token
                const token = jwt.sign(
                    { userId: existingUser._id, roles: existingUser.role },
                    "SecretKey123"
                );

                res.status(200).json({
                   existingUser,
                    token,
                    message: "Login successful",
                });
            } else {
                res.status(400).json({
                    message: "Invalid Login credentials.",
                });
            }
        } else {
            res.status(400).json({
                message: "Invalid Login credentials.",
            });
        }
    } catch (error) {
        res.status(401).json(`Error: Transaction failed!! ${error}`);
    }
};


// login as host

exports.hostLogin = async(req,res)=>{
    // onsole.log("inside login function");
    const { email, password } = req.body;

    try {
        // Find the user by email
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            // Compare the provided password with the stored password
            if (password === existingUser.password) {
                // Generate and send a JWT token
                const token = jwt.sign(
                    { userId: existingUser._id, roles: existingUser.role },
                    "SecretKey123"
                );

                res.status(200).json({
                   existingUser,
                    token,
                    message: "Login successful",
                });
            } else {
                res.status(400).json({
                    message: "Invalid Login credentials.",
                });
            }
        } else {
            res.status(400).json({
                message: "Invalid Login credentials.",
            });
        }
    } catch (error) {
        res.status(401).json(`Error: Transaction failed!! ${error}`);
    }
}

// edit userdetails
exports.editUser =async(req,res)=>{
  const {username,email,password,role, Adress,image} = req.body
  const profileImage =  req.file ? req.file.filename :image
  const userId= req.userId
// console.log(profileImage);
  try {
    const updateUser = await users.findByIdAndUpdate({_id:userId},{
        username
        ,email
        ,password,
        role,
        Adress,
       image:profileImage
    },{new:true})
    
    res.status(200).json(updateUser);
// console.log(profileImage);
  } catch (error) {
    res.status(401).json(error);

  }
}

// edit user when they become a host
exports.userEdit =async(req,res)=>{
  const userId = req.userId
//   console.log(req.userId);

  try {

    const hostUser = await Host.findOne({userId})
    if(!hostUser){
        // console.log(userId);
   res.status(400).json({
    message:'user is not a host'
   })
    }

    const updateUser = await users.findByIdAndUpdate({_id:userId},{
        $addToSet:{role:'host'}
    },{new:true})
    res.status(200).json(updateUser)
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}





