const mongoose =require('mongoose');
require('./studentsModel');

const dbName=process.env.DB_NAME;
const dbURL = process.env.DB_URL +""+ dbName;

mongoose.connect(dbURL,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology: true});

mongoose.connection.on("connected",()=>{
    console.log('Mongoose connected to ',dbURL);
})

mongoose.connection.on("disconnected",()=>{
    console.log('Mongoose  disconnected');
})

mongoose.connection.on("error",(err)=>{
    console.log('Mongoose connection error',err);
})


process.on('SIGINT',()=>{
    mongoose.connection.close(()=>{
        console.log("Application terminated");
        process.exit(0);
    });
})

process.on('SIGUSR2',()=>{ // THIS ONE HELPS IF WE ARE USING NODEMON
    mongoose.connection.close(()=>{
        console.log("Application terminated");
        process.kill(process.pid,"SIGUSR2");
    });
})
