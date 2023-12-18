const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    confirmpassword:String,
    image:String
})

module.exports=mongoose.model('user',userSchema)