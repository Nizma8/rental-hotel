const express = require('express')
const Usercontroller = require('../Controller/userController')
const router = new express.Router()
router.post('/user/register',Usercontroller.userRegister)


module.exports = router