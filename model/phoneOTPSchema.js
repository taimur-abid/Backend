const mongoose = require('mongoose');

const phoneOTPSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
      },
      otp: {
        type: String,
        
      },
      expiration: {
        type: Date,
   
      }
});

const PhoneOTP = mongoose.model('PhoneOTP', phoneOTPSchema);

module.exports = PhoneOTP;