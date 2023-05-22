const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const exphbs = require('express-handlebars');


const router = express();


require ('../db/conn');
const User = require("../model/userSchema");




router.post('/send-otp', (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'i190742@nu.edu.pk',
        pass: 'fouzcovgvidabsfn'
      }
    });
    
    var otpEmail = Math.random();
    otpEmail = otpEmail * 1000000;
    otpEmail = parseInt(otpEmail);
    console.log(otpEmail);

    const mailOptions = {
      from: 'i190742@nu.edu.pk',
      to: req.body.email,
      subject: 'Verification OTP for KIRAYA' ,
      text: `Your OTP is: ${otpEmail}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send('OTP sent');
      }
    });
  });


// Verify the OTP
//const User = require('./models/user');

router.post('/verify-otp', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send('User not found');
    } else if (user.otpEmail !== req.body.otpEmail) {
      res.status(401).send('Invalid OTP');
    } else {
      //user.isVerified = true;
      user.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send('OTP verified');
        }
      });
    }
  });
});



/*


//View Engine
router.engine('handlebars', exphbs.engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ " }));
router.set('view engine', 'handlebars');

// body parser middleware
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

//static folder
router.use('/public', express.static(path.join(__dirname, 'public')));

router.get('/', function (req, res) {
    res.render('contact');
});



var email;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'i190742@nu.edu.pk',
        pass: 'fouzcovgvidabsfn',
    }

});

router.post('/send-otp', function (req, res) {
    email = req.body.email;

    // send mail with defined transport object
    var mailOptions = {
        to: req.body.email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    // Save the OTP in the database (e.g. MongoDB)
    User.findByIdAndUpdate(req.body._Id, { otp });
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('otp');
    });

    
});

router.post('/verify', function (req, res) {

    if (req.body.otp == otp) {
        res.send("You has been successfully registered");
    }
    else {
        res.render('otp', { msg: 'otp is incorrect' });
    }
});

router.post('/resend', function (req, res) {
    var mailOptions = {
        to: email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('otp', { msg: "otp has been sent" });
    });

});

*/


module.exports = router;









// //defining port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`app is live at ${PORT}`);
// })