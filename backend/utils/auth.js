const jwt = require('jsonwebtoken')
function verifyToken(req,res,next){
    require('dotenv').config()
    const bToken=req.headers.authorization;
    console.log(bToken)
   try{
    if(bToken){
        const token=bToken.split(' ')[1]
        let dToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(dToken)
        next()
    }
       
   }
   catch(err){
    res.status(403).send({message:err.message})
   }
}
module.exports=verifyToken