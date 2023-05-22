const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");


const app = express();
dotenv.config({ path: './config.env' });
require('./db/conn');


app.use(express.json());
//const Recommendation = require('./pythonScript/recommendation.py');
//const Recommendation = require('./router/recommendation');
const User = require('./model/userSchema');
const Product = require('./model/productSchema');
const Image = require('./model/imageSchema');
//const PhoneOTP = require('./model/phoneOTPSchema');

//linking our router file to make route eazy 
app.use(require('./router/auth'));
app.use(require('./router/otp'));
app.use(require('./router/product'));
//app.use(require('./router/recommendation'));
//app.use(require('./router/upload'));
//app.use(require('./router/phoneOTP'));


const PORT = process.env.PORT;
var corsOptions = {
  origin: "http://localhost:8081"
};
 

//app.use(cors(co));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});



// set port, listen for requests

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});