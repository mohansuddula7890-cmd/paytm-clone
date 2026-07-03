const express=require ("express");
const cors=require("cors");
const userRouter=require("./routes/user")
const accountRouter=require("./routes/account")
const app=express();
const PORT=3000;
app.use(express.json());
app.use(cors());
app.use('/api/v1/user',userRouter);
app.use('/api/v1/account',accountRouter);
app.get('/test',(req,res)=>{
    res.json({
        msg:"good morning"
    })
})


    
    

app.listen(3000,()=>{
    console.log("listening to port 3000");
})