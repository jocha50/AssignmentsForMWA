const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('./api/data/db')
const routes = require('./api/routes');

const app =express();
app.use('/api',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH')
    next();
})
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname,process.env.PUBLIC_FOLDER)))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    console.log(req.url);
    next();
})







app.use('/api',routes)

const PORT = process.env.PORT;
const server = app.listen(PORT,()=>{
    console.log("Listening on port",server.address().port);
});