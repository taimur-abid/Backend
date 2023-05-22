
const mongoose = require('mongoose')

//const url = `Connection String`;
const DB = process.env.DATABASE;

const connectionParams={
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(DB,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })