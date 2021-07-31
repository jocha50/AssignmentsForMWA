const express = require('express');
require('dotenv').config();
const path = require('path');
const mongoose = require('./api/data/db')
const routes = require('./api/routes')






const app = express();


app.use((req,res,next)=>{
    console.log(req.url);
    next();

})

app.use(express.static(path.join(__dirname,process.env.PUBLIC_FOLDER)));
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/api',routes);





const PORT = process.env.PORT;
const server = app.listen(PORT,()=>{
    console.log(`server is running on ${server.address().port}`);
})