const mongoose =require('mongoose');


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    name:String,
    password:{
        type:String,
        required:true
    }
})


mongoose.model('User',userSchema);