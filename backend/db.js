const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/paytmApp").then(()=>{
    console.log("conected")
})
const userschema=mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String
})
const accountschema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
        balance:Number
    
})
const user=mongoose.model("user",userschema);
const account=mongoose.model("account",accountschema);
module.exports={
    user,account
}