const mongoose=require("mongoose");
require('dotenv').config();

const DBconnection=async ()=>{
    const MONGODB_URL=process.env.MONGODB_URI;
    try{
        await mongoose.connect(MONGODB_URL,{useNewUrlParser:true});
        console.log("connected to db");

    }catch(error){
        console.log("Error connecting"+error);

    }

}
module.exports={DBconnection};
