

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  
    title:String,
    sites:Number
})

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    GPA:{
        type:Number,
        min:0,
        max:4,
    },
    courses:[courseSchema]

})




mongoose.model('Students',studentSchema,'Students')