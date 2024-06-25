const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const problemSchema=new Schema({
    problem_name:{
        type:String,
        required:true
    },
    problem_statement:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        required:true
    },
});
module.exports=mongoose.model("Problem",problemSchema);