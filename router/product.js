const express = require('express');
const csvtojson = require('csvtojson');
const fs = require('fs');
const csv = require('csv-parser');
const readline = require('readline');
const mongoose = require('mongoose');

const router = express.Router();
const getClient = require ('../db/conn');
const Product = require("../model/productSchema");

// //product 


router.get('/PRODUCTS', async (req, res) => {
   try {
     const products = await Product.find();
     res.status(200).json(products);
   } catch (err) {
     console.log(err);
     res.status(500).json({ error: "Internal server error" });
   }
 });
 

router.post('/PRODUCTS', async (req,res)=>{
   const {adtitle , category , price , png , description , location , condition , rating} = req.body;   
   if(!adtitle || !category || !price || !png || !description || !location || !condition || !rating  )
   {
     return res.status(422).json({error: "Fill the remaining fields to continue"});
   }
   
try {
   //we have to add product id and increment it later
   const productExist = await Product.findOne({ adtitle:adtitle});  
   if ( productExist)
   {
     return res.status(422).json({ error: "Name already exsists"});  
   }  
   else 
   {
      
      const product = new Product({ adtitle , category , price , png , description , location , condition , rating });
      const productUpload = await product.save();
      res.status(201).json({message: "product uploaded successfully"});
      
   }
} 
catch(err)
{
   console.log(err);
}
});

module.exports = router;

