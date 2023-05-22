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
const Image = require("../model/imageSchema");

router.get('/cnicImage', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

router.get('/profileImage', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });


// router.post('/PRODUCTS', async (req,res)=>{
//     const {adtitle , category , price , png , description , location , condition , rating} = req.body;   
//     if(!adtitle || !category || !price || !png || !description || !location || !condition || !rating  )
//     {
//       return res.status(422).json({error: "Fill the remaining fields to continue"});
//     }
    
//  try {
//     //we have to add product id and increment it later
//     const productExist = await Product.findOne({ adtitle:adtitle});  
//     if ( productExist)
//     {
//       return res.status(422).json({ error: "Name already exsists"});  
//     }  
//     else 
//     {
       
//        const product = new Product({ adtitle , category , price , png , description , location , condition , rating });
//        const productUpload = await product.save();
//        res.status(201).json({message: "product uploaded successfully"});
       
//     }
//  } 
//  catch(err)
//  {
//     console.log(err);
//  }
//  });


 module.exports = router;