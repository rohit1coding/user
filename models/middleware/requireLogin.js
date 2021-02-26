const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require("../../cofig/keys")
const mongoose=require('mongoose')
module.exports=(req,res,next)=>{
    require('../../models/user')
    const User=mongoose.model('user')

    const{authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must be logged in!"})
    }
    const token= authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){return res.status(401).json({error:"You must be logged in!"})}
        const {_id}=payload;
        User.findById(_id)
            .then(userData=>{
                req.user=userData;
            })
        next();
    })
}