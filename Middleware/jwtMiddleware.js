const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req,res,next)=>{
  const token = req.headers['authorization'].split(" ")[1]
  
  try{
    const jwtResponse = jwt.verify(token,"SecretKey123")
    req.userId = jwtResponse.userId;
    req.roles = jwtResponse.roles;
    next()
  }
  catch(error){
    res.status(401).json("Authorisation failed!! please login...")
  }
}
module.exports = jwtMiddleWare