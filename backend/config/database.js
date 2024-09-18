const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/Todoapp";

const connectdataBase = async () =>{
    try{
        await mongoose.connect(URI);
        console.log('connect database');
    } catch (err){
        console.error(err)
    }
};


module.exports = connectdataBase;