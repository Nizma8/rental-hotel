const subscribers = require("../Model/SubscribeSchema")
const nodemailer = require('nodemailer')
exports.subscribeController = async(req,res)=>{
    const {email} =req.body
    // check if email exists
    try{const existingUser = await subscribers.findOne({email:email})
    if(existingUser){
        return res.status(400).json({ message: 'Email is already subscribed.' });
    }
    else{
        const newSubscriber = new subscribers({email})
       await newSubscriber.save()
        // Send a confirmation email (optional)
    sendConfirmationEmail(email);
       res.status(200).json({ message: 'Subscription successful.' });
    }}
    catch(error){
    console.error('Subscription failed:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
    }
}

const sendConfirmationEmail=async(email)=>{
     const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_ADMIN,
            pass:process.env.EMAIL_PASSWORD
            
     },});

     const mailOptions = {
        from:process.env.EMAIL_ADMIN,
        to:email,
        subject: 'Subscription Confirmation',
        text: 'Thank you for subscribing!',
     }

     transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            console.error('Email sending failed:', error);
          } else {
            console.log('Email sent:', info.response);
          }
     })

     

}