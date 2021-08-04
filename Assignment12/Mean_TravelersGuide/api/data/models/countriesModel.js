const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
    hotelName:{
        type:String,
    },
    address:{
        type:String,
    },
    phone:Number,
    description:String
})

const additionalInfoSchema = new mongoose.Schema({
    timeZone:{
        type:String,
    },
    bestTimeToVisit:{
        type:String,
    },
    bestHotels:[hotelsSchema]
})





const countrySchema = new mongoose.Schema({

    countryName:{
        type:String,
        required:true,
    },
    capitalCity:{
        type:String,

    },
    officialLanguage:{
        type:String,
    },
    currency:{
        type:String,
    },
    population:{
        type:Number,
    },
    coordinates:{ 
        type:[Number],
        index:'2dsphere'
    },
    additionalInfo:additionalInfoSchema
})


mongoose.model("Country",countrySchema,'countries');