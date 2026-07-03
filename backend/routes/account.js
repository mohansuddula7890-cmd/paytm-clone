const express=require("express");
//authorization,database,backend errors solved

const router=express.Router();

const{account,user}=require("../db");

const mongoose=require("mongoose");
const {authMiddleware}=require("../middleware");
router.get("/balance",authMiddleware,async (req,res)=>{
    try{
        const Account=await account.findOne({
            userId:req.userId
        })
        if(!Account){
            return res.status(404).json({
                message:"Account not found"
            })

        }
        res.json({
            balance:Account.balance
        })

    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession()
    const bodydata=req.body;
    const to=bodydata.userId;
    const amount=bodydata.balance;//then only problem is with .session(session) word at end of await line
    try{
            session.startTransaction();

        
    
    if (amount <= 0) {
            throw new Error("Invalid amount");
        }
    if (to === req.userId) {
    throw new Error("Cannot transfer to yourself");
    }

        const sender = await account.findOne(
            { userId: req.userId },
            null,
            { session }
        );

        if (!sender || sender.balance < amount) {
            throw new Error("Less balance");
        }

        const receiver = await account.findOne(
            { userId: to },
            null,
            { session }
        );

        if (!receiver) {
            throw new Error("Receiver not found");
        }

        await account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } },
            { session }
        );

        await account.updateOne(
            { userId: to },
            { $inc: { balance: amount } },
            { session }
        );

           await session.commitTransaction();

        return res.json({ message: "Transfer successful" });

    }catch(err){
        await session.abortTransaction();
        //console.log(err.getMessage());
        return res.json({
            message:"error from transfer",
            
        })
    }finally{
        session.endSession();
    }
     
})
module.exports=router
