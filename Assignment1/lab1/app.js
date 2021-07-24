const express = require('express');
require('dotenv').config();


const app = express();

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.status(200).send({"json":"server running..."});
})
const server = app.listen(PORT, ()=>{
    console.log("server is listening on ",server.address().port);
})