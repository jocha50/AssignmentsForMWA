const express = require('express');
require('dotenv').config();
const mongoose = require('./api/data/db')
const routes = require('./api/routes');

const app =express();

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