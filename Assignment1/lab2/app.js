const express = require('express');
require('dotenv').config();
const path= require('path');
const routes = require('./api/route');



const app = express();


app.use(express.static(path.join(__dirname,process.env.PUBLIC_FOLDER)));

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use('/api',routes);


const PORT = process.env.PORT;
const server = app.listen(PORT, ()=>{
    console.log(`server is running on ${server.address().port}`);
})

