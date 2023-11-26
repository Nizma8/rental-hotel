const express = require('express')
const Usercontroller = require('../Controller/userController')
const hostcontroller = require('../Controller/hostController')
const jwtMiddleWare = require('../Middleware/jwtMiddleware')
const router = new express.Router()
router.post('/user/register',Usercontroller.userRegister)
router.post('/user/login',Usercontroller.userLogin)
router.post('/host/login',jwtMiddleWare,hostcontroller.hostLogin)
module.exports = router