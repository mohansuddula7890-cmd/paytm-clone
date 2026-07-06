const express=require("express");
const router=express.Router();
require("dotenv").config();

 const jwt=require("jsonwebtoken");

const zod=require("zod");
//import{zod} from"zod";
const {user,account}=require("../db");
const {authMiddleware}=require("../middleware");

const signupzod=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})
const signinschema=zod.object({
    username:zod.string(),
    password:zod.string()

})
const updateschema=zod.object({
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})
router.post("/signup",async(req,res)=>{
    const bodydata=req.body;
    const {success}=signupzod.safeParse(bodydata);
    if(!success){
        return res.status(411).json({
            message:"wrong inputs"
        })
    }
    try{
        const usered=await user.findOne({
            username:bodydata.username
        })
        if(usered){
            return res.status(401).json({
                msg:"user exists already"
            })
        }
        const dbuser=await user.create({
             username:bodydata.username,
             password:bodydata.password,
             firstname:bodydata.firstname,
             lastname:bodydata.lastname

        })
        await account.create({
            userId:dbuser._id,
            balance:1+Math.random()*10000
        })
        const token=jwt.sign({
            userId:dbuser._id//userId word declartion
        },process.env.JWT_SECRET);

        return res.json({
            message:"created successfilly",
            token:token
        })
    }catch(err){
        return res.json({
            message:"error in signup route ",
            
        })
    }
})
router.post("/signin",async(req,res)=>{
    const bodydata=req.body;
    const check=signinschema.safeParse(bodydata);
    if(!check.success){
        return res.json({
            message:"wrong inputs"
        })
    }
    try{
        const usere=await user.findOne({
            username:bodydata.username
        })
        if(!usere){
            return res.status(401).json({
                message:"no user found"
            })
        }
        if(usere.password!==bodydata.password){//!== strict checking
            return res.status(401).json({
                message:"Incorrect password"
            })
        }
        const token=jwt.sign({userId:usere._id},process.env.JWT_SECRET);
        const firstname=usere.firstname
        res.json({
            message:"signed in successfuly",
            token:token,
            firstname:firstname
        })
    }catch(err){
        return res.json({
            message:"error from signin"
        })
    }
})
router.put('/update',authMiddleware,async (req,res)=>{
    const bodydata=req.body;
    const check=updateschema.safeParse(bodydata);
    if(!check.success){
         return res.json({
            message:"wrong inputs"
        })
    }
    try{
        await user.updateOne({
            _id:bodydata.userId
        },req.body);

    
    res.json({
            message:"Updated succesfully"
        })
    }catch(err){
        return res.json({
            message:"error in updating"
        })
    }
    

})
router.get("/getallusers",async (req,res)=>{
    const filter=req.query.filter||"";
    try{
        const users=await user.find({
            $or:[
                {
                    firstname:{
                        $regex:filter,
                        $options:"i"
                    }
                },{
                    lastname:{
                        $regex:filter,
                        $options:"i"
                    }
                }
            ]
        })
        return res.json({
            message:"done",
            users:users.map(user=>({
                username:user.username,
                firstname:user.firstname,
                lastname:user.lastname,
                _id:user._id

            }))
        })
    }catch(err){
        return res.json({
            message:"error in getting all users"
        })
    }
})
router.delete("/me",authMiddleware,async(req,res)=>{
    try{
        const userId=req.userId;
        if(!userId){
            return res.status(401).json({
                message:"Unauthorized:No user ID found."
            })

        }
        await account.deleteOne({userId});
        const result=await user.deleteOne({_id:userId})
        if(result.deleteCount===0){
            return res.status(404).json("user not found.")
        }
        return res.json({message:"Account deleted succesfully."})
    }catch(err){
        console.error("Error in deleteing user/account",err)
        return res.status(500).json({
            message:"Internal server error."
        })
    }
})
module.exports=router
