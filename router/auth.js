const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const exphbs = require('express-handlebars');



//it will get all the ability of express
const router = express.Router();


require ('../db/conn');
const User = require("../model/userSchema");

 router.get('/',(req,res)=>{
    res.send('helo world from the server from router js')
 });

 
//REGISTRATION OF USER
router.post('/register', async (req,res)=>{
   const {name, username, password, confirm_password, cnic, location, phoneNumber, email, cnic_picture} = req.body;
   if(!name || !username || !password || !cnic || !location || !email  )
   {
     return res.status(422).json({error: "Fill the remaining fields to continue"});
   }

try {
   const userExist = await User.findOne({ email:email});  
   if (userExist)
   {
     return res.status(422).json({ error: "Email already exsists"});  
   } 

   else if(password < 8)
   {   
      return res.status(400).json({ error: "Password must me more than 8 in length" });     
   }
   else 
   {

      const user = new User({name, username, password,  cnic, location, email} );
      const userRegister = await user.save();
      
       res.status(201).json({message: "user registered successfully"});
      
   }
   
   

} 
catch(err)
{
   console.log(err);
}
});


//USER LOGIN
router.post('/signin', async (req,res) => {
   let token;
   try {
      const { email, password} = req.body;
      if(!email || !password)
      {
         return res.status(400).json({error:"Please fill the fields"})
      }

      const userLogin = await User.findOne({email:email});
      //console.log(userLogin);
      //comparing hash password with login password 
      if (userLogin)
      {
      
      const isMatch = await bcrypt.compareSync(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      //console.log(token);

      if(!isMatch) { res.status(400).json({error: "User NOT Signed In Successful  INVALID CREDENTIALS !!!"}); }
      else { res.json({message: "User Signed In Successful!!!"}); }
     
      }
      else { res.status(400).json({ error: "iNVALID CREDENTIALS"}); }
      
   } catch (err){
      console.log(err);2
   } 
   
   });



//OTP VERIFICATION


// router.post('/send-otp', async (req, res) => {
//    try {
//      // Generate the OTP (e.g. using a library like speakeasy)
//      const otp = generateOtp();
//      // Send the OTP to the user's email
//      await transport.sendMail({
//        from: 'i190742@nu.edu.pk',
//        to: req.body.email,
//        subject: 'Your OTP',
//        text: `Your one-time password is: ${otp}`
//      });
//      // Save the OTP in the database (e.g. MongoDB)
//      await User.findByIdAndUpdate(req.body._Id, { otp });
//      return res.send({ success: true });
//    } catch (error) {
//      console.error(error);
//      return res.send({ success: false, error: error.message });
//    }
//  });
 
 module.exports = router;