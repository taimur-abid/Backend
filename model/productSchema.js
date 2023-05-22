const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const exphbs = require('express-handlebars');


const productSchema = new mongoose.Schema({
  adtitle:{
    type: String,
    required:false
},

category:{
  type: String,
  required:false
},
price:{
  type: Number,
  required:false 
},

png:{
  type: Array,
  required: true
},
description:{
  type: String,
  required:false
},
location:{
  type: String,
  required:false
},
condition:{
  type: String,
  required:false
},
rating:{
  type: Number,
  required:false
}
  });

const Product = mongoose.model('PRODUCT',productSchema);
module.exports = Product;
