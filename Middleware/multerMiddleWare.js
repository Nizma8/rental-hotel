const multer = require("multer");
// storage

const storage = multer.diskStorage(
  // destination
  {
    destination: (req, file, cb) => {
    try { cb(null, "./uploads");}
    catch(error){
        cb(console.log(error),null)
    }
    },
    filename: (req, file, cb) => {
      try{const filename = `Image-${file.originalname}`;
      cb(null, filename);
    }
      catch(error){
        cb(console.log(error),null)
      }
    },
  }


  
);
// file type
  
const fileFilter = (req,file,callback)=>{
    if(file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error ("only .png , .jpg, .jpeg file are allowed !!"))
    }
  }

  const multerConfig = multer({
    storage,
    fileFilter

  })

  module.exports = multerConfig