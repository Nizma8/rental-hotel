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
            role:'user',
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

//login 
exports.userLogin = async (req, res) => {
    console.log("inside login function");
    const { email, password } = req.body;

    try {
        // Find the user by email
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            // Compare the provided password with the stored password
            if (password === existingUser.password) {
                // Generate and send a JWT token
                const token = jwt.sign(
                    { userId: existingUser._id, role: existingUser.role },
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
    onsole.log("inside login function");
    const { email, password } = req.body;

    try {
        // Find the user by email
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            // Compare the provided password with the stored password
            if (password === existingUser.password) {
                // Generate and send a JWT token
                const token = jwt.sign(
                    { userId: existingUser._id, role: existingUser.role },
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





