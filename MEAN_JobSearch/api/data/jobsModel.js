const mongoose = require('mongoose');

// title, salary, location, description, experience, skills, postDate

const locationSchema = new mongoose.Schema({
    coordinates:{ //lng,lat
        type:[Number],
        index:'2dsphere'
    }
})

const reviewsSchema = new mongoose.Schema({
    date:Date,
    review:String,
    nameOfReviewer:String,
})
const jobSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
salary:{
    type:Number,
},
description:String,
experience:Number,
skills:[String],
postDate:Date,
location:locationSchema,
reviews:[reviewsSchema],
})


mongoose.model('Job',jobSchema,'jobs');