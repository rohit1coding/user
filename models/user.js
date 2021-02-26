const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    contact:{type:Number},
    pic:{type:String,
        default:"https://res.cloudinary.com/rohit1coding/image/upload/v1613576167/blank-profile-picture-973460_640_k0dny4.webp"
    },
    password:{type:String,require:true}
});
mongoose.model('user',UserSchema)