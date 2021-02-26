const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET} =require('../cofig/keys')
const requireLogin=require('../models/middleware/requireLogin')
require('../models/user')
const User=mongoose.model("user")
var blankImg="https://res.cloudinary.com/rohit1coding/image/upload/v1613576167/blank-profile-picture-973460_640_k0dny4.webp"
router.get("/protected",requireLogin,(req,res)=>{
    res.send("Hello User")
})
router.get('/',(req,res)=>{
    res.send("Hello from Server");
});
router.post('/SignUp',(req,res)=>{
    const {name,email,contact,pic,password}=req.body;
    if(!name || !email || !password)
        return (res.status(422).json({error:"please add all the fields!"}))
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"email already exists"})
        }
    bcrypt.hash(password,12)
        .then(hashedPassword=>{
            const user=new User({
            email,password:hashedPassword,name,pic,contact
        })
        user.save()
            .then(user=>{res.json({message:"Account created successfully!"})})
            
        })
    })
    
    .catch(err=>{console.log(err)})   
})

router.post('/Login',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
        return( res.status(422).json({error:"Please enter email and password!"}))
    User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser)
                return res.status(422).json({error:"Invalid email or password!"})
            bcrypt.compare(password,savedUser.password)
                .then(doMatch=>{
                    if(doMatch){
                        // res.json({message:"successfully Login"})
                        const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                        const {_id,name,email,pic,contact}=savedUser;
                        res.json({token,user:{_id,name,email,contact,pic}})
                    }   
                    else
                        return res.status(422).json({message:"Invalid email or password"})                 
        
                })
                .catch(err=>{console.log(err)})
        })
        .catch(err=>{console.log(err)})
})
router.put('/UpdatePic',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body._id,{$set:{pic:req.body.pic}},{new:true},(err,result)=>{
        if(err){
            return res.status(422).json({error:"pic can not post"})
        }
        res.json(result)
    })
})
router.put('/deleteProfile',(req,res)=>{
    User.findByIdAndUpdate(req.body._id,{$set:{pic:"https://res.cloudinary.com/rohit1coding/image/upload/v1613576167/blank-profile-picture-973460_640_k0dny4.webp"}},{new:true},(err,result)=>{
        if(err){
            return res.status(422).json({error:"pic can not post"})
        }
        res.json(result)
    })
})
module.exports=router;