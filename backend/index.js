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
app.post('/',(req,res)=>{
    res.json({
        msg:"use this route for signup /api/v1/user/signup "
    })
})


    
    

app.listen(3000,()=>{
    console.log("listening to port 3000");
})