require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
 require('./DB/connection')
const server = express() 
server.use(cors())
// is configuring Express to use the built-in middleware for parsing JSON data.(since we are getting json type data we have to convert so that js can understand)
server.use(express.json())
server.use(router)
const PORT = 4000 || process.env.PORT
server.listen(PORT,()=>{
    console.log(`server started at port:${PORT}`);
})

// resolve request to localhost4000
server.get('/',(req,res)=>{
    res.send("server started!!!! ")
  })
  
  