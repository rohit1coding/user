var express= require('express');
var app=express();
var mongoose= require('mongoose');
const {MongoURI}=require('./cofig/keys');
const router = require('./routh/auth');
require('./models/user')
const PORT= process.env.PORT || 3001;
mongoose.connect(MongoURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log("connected to Mongodb")})
    .catch((err)=>{console.log("Error:connecting Mongodb:",err)})
mongoose.model('user');
app.use(express.json())
app.use(router)
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })  
}

app.listen(PORT,()=>{console.log(`App is running on Port:${PORT}`)});

