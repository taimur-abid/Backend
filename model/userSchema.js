const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const exphbs = require('express-handlebars');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required:true
    },

    
   // confirm_password:{
    //    type: String,
    //    required:true
    //}
    
    //,
    email:{
        type:String,
        required:true
    }, 
    password:{
        type: String,
        required:true
    },
    

    location:{
        type: String,
        required:true
    },
    
    cnic:{
        type: String,
        required:true
    },

    cnic_picture:{
        type:String,
        required:false 
    }
    // phoneNumber:{
    //     type:Number,
    //     required:false
    // },

    // isVerified: {
    //     type: Boolean,
    //     default: false
    //   },

    // tokens: [
    //     {
    //         token:{
    //             type: String,
    //             required:false 
    //         }
    //     }
    // ],

    
    // otpEmail:{
    //             type:String
    //         },

    
        
    // otpPhpne:{
    //             type:Number
    //         }
    
        })



//we are hashing the password 

userSchema.pre('save', async function(next){
  //  console.log("hi from inside");
if(this.isModified('password'))
{
    this.password = await bcrypt.hash(this.password, 12);
   // this.confirm_password = await bcrypt.hash(this.confirm_password, 12);
}
    next();
});

// we are generating token JWT 
userSchema.methods.generateAuthToken = async function(){
    try {
       let token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY);
       this.tokens = this.tokens.concat({token:token});
       await this.save();
       return this.token;
    } catch (err){
     console.log(err);
    }
}


const User = mongoose.model('REGISTER',userSchema);
module.exports = User;