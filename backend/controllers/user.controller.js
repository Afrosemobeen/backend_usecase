const {User} = require('../models/user.model')
const {Admin} = require('../models/admin.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
require('dotenv').config()
const secretKey= process.env.JWT_SECRET_KEY
const register = async(req,res)=>{
   try{
    let  {firstname,lastname,phone,email,id,password,confirmpassword}=req.body
   let user = await User.findOne({$or:[{email},{id}]})
    if(user){
        return res.status(400).send({message:'User already exists'})
    }
    if(password===confirmpassword){
        let hashed = await bcryptjs.hash(password,5)
        password = hashed 
         user = await User.create({firstname,lastname,phone,email,id,password})
        res.status(200).send({message:'succesfully registered',payload:user})
    }   
    else{
        res.status(200).send({message:'Passwords do not match'})
    }
}
catch(error){
    res.status(500).send(error)
 }
}
const login = async(req,res)=>{
    try{
    const {id,password}=req.body
    let user
console.log(id);
    if(id==='admin'){
       user=await Admin.findOne({id:id})
       console.log('admin',user,id);
       if(password===user.password){
       const token = jwt.sign({id:user.id},secretKey,{expiresIn:'1h'})
       
       res.status(200).send({message:'Admin logged in succesfully',token:token})
       }
    }
        
    user = await User.findOne({id:id})
    console.log('User',user);
    if(!user){
        return res.status(400).send({message:'Invalid Credentials'})
    }
    const isMatch = await bcryptjs.compare(password,user.password)
    console.log('User-pass',isMatch);
    if(isMatch){
        const token = jwt.sign({id:user.id},secretKey,{expiresIn:'1h'})
       console.log('token',token);
        res.status(200).send({message:'logged in succesfully',token:token})
    }   
    else{
       
            return res.status(400).send({message:'Invalid Credentials'})
        
    }
}
catch(error){
    res.status(500).send(error)
 }
}

const resetpassword = async(req,res)=>{
    const {token} = req.params
    const {password,confirmpassword}=req.body
  
    try{

 const user=  await User.findOne(
            {resettoken:token}
        )
        console.log('user',user);
  
        let hashed = await bcryptjs.hash(password,5) 
        const update={password:hashed} 
            await User.findOneAndUpdate(
                {id:user.id},{$set:update},{new:true} )  
            
        res.status(200).send({message:'password reset succesfully'})
    
   

}
catch(error){
    res.status(500).send(error)
 }
}
const forgotpassword = async(req,res)=>{
    try{
    const id=req.params.username
    //console.log('id',id,req.params);
    const user = await User.findOne({id:id})
    if(!user){
        res.status(400).send({message:'User does not exist'})
    }
    // console.log('User',user);
    const token= crypto.randomBytes(20).toString('hex')
  const update={ resettoken : token,
    resettime: Date.now()+3600000} 
    await User.findOneAndUpdate(
        {id:id},{$set:update},{new:true}
    )
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "6d6e2b7e842cb8",
          pass: "9e02074b143738"
        }
      });
    const mailOptions={
        to:user.email,
    from:{
        name:"MovieBookinApp",
        address:"moviebookingapp@resetpassword.com"
    },
        subject:'Reset Password Link for Movie Booking App',
        text:`
        Dear ${user.firstname},

        We recieved a request to reset your password for your account.
        If you did not make the request, please ignore the mail.

        To reset your password, please click on the following link:
        http://localhost:3000/api/v1.0/moviebooking/reset-password/${token}

        This link will expire in 24 hours.Please contact our support team regarding any queries
        at moviebookingApp@support.com

        Thank you for using Movie Booking App!

        Best regards,
        Movie Booking App Team
        `

    }
    await transport.sendMail(mailOptions)
    res.status(200).send({message:'reset password email sent succesfully',email:user.email})
}
catch(error){
    res.status(500).send(error)
 }
}

module.exports={register,login,forgotpassword,resetpassword}