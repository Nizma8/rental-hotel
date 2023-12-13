const Host = require("../Model/hostSchema");
const homes = require("../Model/projectSchema");


exports.homesController = async (req, res) => {
  const { chooseType, amenities, name, location, bedCount, price } = req.body;
  const productImage = req.file ? req.file.filename : null;

  // Check for existing home
  const existingHome = await homes.findOne({
    $or: [
      { productImage: productImage },
      { name: name }
    ],
  });

  if (existingHome) {
    return res.status(406).json({ message: "Home already exists." });
  }

  try {
    // Find the host using the userId
    const userRole = await Host.findOne({ userId: req.userId });
    // console.log("User Role ID:", userRole._id);

    if (!userRole) {
      return res.status(400).json({ message: "Host not found..." });
    }
    
    if (existingHome) {
      // console.log('Existing home found. Rejecting request.');
      return res.status(406).json({ message: "Home already exists." });
    }
  } catch (error) {
    // console.error('Error checking for existing home:', error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }

  try {
    // Find the host using the userId
    const userRole = await Host.findOne({ userId: req.userId });
    // console.log('User Role ID:', userRole._id);

    if (!userRole) {
      // console.log('Host not found. Rejecting request.');
      return res.status(400).json({ message: "Host not found..." });
    }
    const amenitiesArray = typeof amenities === 'string' ? amenities.split(',') : amenities;
    // Create a new home document
    const newHomes = new homes({
      productImage: req.file.filename,
      chooseType,
      amenities:amenitiesArray,
      name,
      location,
      bedCount,
      price,
      hostId: userRole._id,
    });

    // Save the new home to the database
    // console.log('Saving new home:', newHomes);
    await newHomes.save();

    // Respond with success message and the new home details
    // console.log('Home Successfully added!!');
    res.status(200).json({
      ...newHomes.toObject(),
      message: "Home Successfully added!!",
    });
  } catch (error) {
    // console.error("Error in homesController:", error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};


// to get all homes
exports.getAllHomes=async(req,res)=>{
try {
  const allHomes = await homes.find()
res.status(200).json({
  homes: allHomes,
  success:true
})
} catch (error) {
  res.status(400).json(error)
}  

}

// view one products
exports.getOneProducts=async(req,res)=>{
  try {
    const {id} =req.params
    // const objectId = new ObjectId(_id)
    const oneProducts = await homes.findOne({_id:id})
    if (!oneProducts) {
      // If no product found
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(oneProducts);
  } catch (error) {
    res.status(400).json(error);
  }
}

exports.deleteProducts = async(req,res)=>{
  try {
    const {id} = req.params
    await homes.findByIdAndDelete({_id:id})
    res.status(200).json({
      message:"Success"
    })
  } catch (error) {
    res.status(400).json(error);

  }
}

// to get host details from products

exports.getHost = async (req, res) => {
  const { id } = req.params;


  try {
    // Find product details
    const productDetails = await homes.findById({ _id: id });
    // Check if productDetails exists and has a hostId
    if (productDetails && productDetails.hostId) {
      // Find host details using hostId
      const hostDetails = await Host.findById({ _id: productDetails.hostId });

      // Check if hostDetails exists
      if (hostDetails) {
        // Use findById to get a single document by _id
        const populatedHostDetails = await Host.findOne({userId:hostDetails.userId}).populate('userId')
        

        res.status(200).json(populatedHostDetails);
      } else {
        res.status(404).json({ message: 'Host not found' });
      }
    } else {
      res.status(404).json({ message: 'Product not found or missing hostId' });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};

// to edit properties
exports.editHomes = async (req, res) => {
  try {
    // Destructure the request body
    const { productImage, chooseType, amenities, name, location, bedCount, price, productsId } = req.body;

    // Get the uploaded image from the request or use the existing one
    const uploadedImage = req.file ? req.file.filename : productImage;

    // Check if the product ID is provided
    if (!productsId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    const amenitiesArray = typeof amenities === 'string' ? amenities.split(',') : amenities;

    // Edit the product
    const editedHomes = await homes.findByIdAndUpdate(
      { _id: productsId },
      {
        productImage: uploadedImage,
        chooseType,
        amenities:amenitiesArray,
        name,
        location,
        bedCount,
        price,
      },
      { new: true }
    );

    // Check if the product with the given ID was not found
    if (!editedHomes) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Send the edited product as a JSON response
    res.status(200).json(editedHomes);
  } catch (error) {
    console.error('Error editing homes:', error);

    // Send a generic error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// to delete hosted property





