const express = require('express')
const Usercontroller = require('../Controller/userController')
const hostcontroller = require('../Controller/hostController')
const jwtMiddleWare = require('../Middleware/jwtMiddleware')
const multerConfig = require('../Middleware/multerMiddleWare')
const homesController = require('../Controller/productController')
const { wishListController, getWishList, removeWishlist } = require('../Controller/wishlistController')
const { yourHome, getChecks, requestBooking, editChekinDates, editChekoutDate, editGuestsNo, listProductsUser, confirmBookingWithPaypal, reviewsChecks } = require('../Controller/CheckoutController')
const { createOrder, captureOrder } = require('../Controller/payapalController')
const { ReviewController, getReviewController, filterReviewsController } = require('../Controller/ReviewContoller')
const router = new express.Router()
router.post('/user/register',Usercontroller.userRegister)
router.get('/user/register',jwtMiddleWare,Usercontroller.togetAllUsers)
router.post('/user/login',Usercontroller.userLogin)
router.post('/host/login',jwtMiddleWare,hostcontroller.hostLogin)
router.post('/host/addProperty',jwtMiddleWare,multerConfig.single('productImage'),homesController.homesController)
router.get('/home/allhomes',homesController.getAllHomes)
router.get('/home/products/:id',homesController.getOneProducts)
router.post('/user/wishlist',jwtMiddleWare,wishListController)
router.get('/home/wishlist',jwtMiddleWare,getWishList)
router.post('/products/check',jwtMiddleWare,yourHome)
router.get('/product/finalcheck',jwtMiddleWare,getChecks)
router.put('/product/confirmBooking',requestBooking)
router.delete('/product/wishlist/:id',jwtMiddleWare,removeWishlist)
router.put('/product/check/edit',editChekinDates)
router.put('/product/check/checkout',editChekoutDate)
router.put('/product/check/guest',editGuestsNo)
router.delete('/product/:id',jwtMiddleWare,homesController.deleteProducts)
router.put('/user/edit',jwtMiddleWare,multerConfig.single('profileImage'),Usercontroller.editUser)
router.get('/products/check',jwtMiddleWare,listProductsUser)
router.put('/user/edits',jwtMiddleWare,Usercontroller.userEdit)
router.get('/homes/host',jwtMiddleWare,hostcontroller.togetUserDetails)
router.get('/product/host/:id',homesController.getHost)
router.put('/product/edit',multerConfig.single('uploadedImage'),homesController.editHomes)


router.post('/my-server/create-paypal-order', async (req, res) => {
    try {
      const { totalAmount } = req.body;
  console.log(totalAmount+"totak");
      // Call the controller function to create a PayPal order
      const orderID = await createOrder(totalAmount);
  
      res.status(200).json({
        orderID: orderID,
        message: 'PayPal order created successfully',
      });
      console.log(orderID+"orderId");
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  });
  router.post('/my-server/capture-paypal-order', async (req, res) => {
    const {orderID} = req.body;

    try {
        const captureData = await captureOrder(orderID);
        res.status(200).json({
            message: 'Payment captured successfully',
            captureData: captureData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to capture payment',
            error: error.message,
        });
    }
});

router.post('/user/review',jwtMiddleWare,ReviewController)
router.get('/user/review',jwtMiddleWare,getReviewController)
router.get('/product/review/:id',jwtMiddleWare,filterReviewsController)
// router.put('/check/update/review',jwtMiddleWare,reviewsChecks)
module.exports = router