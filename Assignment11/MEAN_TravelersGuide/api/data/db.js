const mongoose = require('mongoose');

require('./models')


const dbName=process.env.DB_NAME;
const dbURL = process.env.DB_URL +""+ dbName;


mongoose.connect(dbURL,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});


mongoose.connection.on('connected',()=>{
    console.log('mongoose is connected to ',dbURL);
});

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose disconnected');
})

mongoose.connection.on('error',(err)=>{
    console.log('Mongoose faced an error',err)
})


process.on('SIGINT',()=>{
    mongoose.connection.close(()=>{
        console.log('Application terminated');
        process.exit(0);
    })
})

process.on('SIGUSR2',()=>{
    mongoose.connection.close(()=>{
        console.log('Application terminated');
        process.kill(process.pid,'SIGUSR2');
    })
})