require("dotenv").config();
const jwt=require("jsonwebtoken");
const authMiddleware= (req,res,next)=>{
    const authheader=req.headers.authorization;
    if(!authheader||!authheader.startsWith('Bearer ')){
        return res.status(403).json({
              msg : "fake user trying .."

        })
    }
    const token=authheader.replace('Bearer ', '').trim();
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.userId){
            req.userId=decoded.userId;
            next();

        }else{
            return res.status(403).json({
                msg:"token wrong"
            })
        }
    }catch(err){
        if (err.name === 'JsonWebTokenError') {
    return res.status(403).json({ msg: 'Invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(403).json({ msg: 'Token expired' });
  }
  return res.status(500).json({ msg: 'Server error' });
    }
}
module.exports={
    authMiddleware
}