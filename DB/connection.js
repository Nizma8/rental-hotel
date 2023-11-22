const mangoose = require('mongoose')
const connectionString = process.env.DATABASE
mangoose.connect(connectionString).then(()=>{
    console.log("MongoDb Atlas connected successfully with Server");
}).catch(err=>{
 console.log("MongoDb connection failed"+ err);
})