const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    image1CNIC: {
      type: String,
      required:true
    },

    image2ProfilePic: {
      type: String, 
      required:true
    }
   
  });

const Image = mongoose.model('IMAGE',imageSchema);
module.exports = Image;