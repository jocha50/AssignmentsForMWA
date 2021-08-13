const mongoose= require('mongoose');


const publisherSchema = new mongoose.Schema({
name:{
    type:String,
},
country:{
    type:String,
},

coordinates:{//stores the coordinates in longitude (E/W) latitude(N?S)
    type:[Number],
    index:'2dsphere'
} 
// location:{
   
//    coordinates:{//stores the coordinates in longitude (E/W) latitude(N?S)
//        type:[Number],
//        index:'2dsphere'
// } 
// }
})

const reviewsSchema = new mongoose.Schema({
    name:String,
    review:String,
    date:Date
})

const gameSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    year: Number,
    rate: {
        type:Number,
        min:1,
        max:5,
        default:1
    },
    price: Number,
    minPlayers:{ 
        type:Number,
        min:1,
        max:10
    },
    maxPlayers: { 
        type:Number,
        min:1,
        max:10
    },
    minAge:Number,
    designers:[String],
    publisher:publisherSchema,
    reviews:[reviewsSchema]

});


mongoose.model('Game',gameSchema,'games');