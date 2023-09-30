var jwt = require("jsonwebtoken");
const secretKey = "avishake"; 
const fetchUser=(req,res,next)=>{
    const token=req.header('token');
    if(!token){
        res.status(401).send({error:"Please authenticate a valid token"})
    }

    try {
        const data=jwt.verify(token,secretKey);
    req.user=data.user;

    next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate a valid token"})
    }
    
}

module.exports=fetchUser;
