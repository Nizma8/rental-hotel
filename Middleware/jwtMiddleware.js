const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req,res,next)=>{
    console.log("inside middleware");
  const token = req.headers['authorization'].split(" ")[1]
  console.log(token);
  try{
    const jwtResponse = jwt.verify(token,"SecretKey123")
    req.userId = jwtResponse.userId;
    req.role = jwtResponse.role;
     
    next()
  }
  catch(error){
    res.status(401).json("Authorisation failed!! please login...")
    console.log(error);
  }
}
module.exports = jwtMiddleWare