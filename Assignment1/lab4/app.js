const express = require('express');
require('dotenv').config();


const app = express();

app.get("/api/add/:firstNumber",(req,res)=>{
    console.log("inside add");
    let firstNumber = req.params.firstNumber;
    let secondNumber= req.query.secondNumber;

    let result = parseFloat(firstNumber) + parseFloat(secondNumber);

    res.status(200).send(`<h1>The sum of ${firstNumber} and ${secondNumber} is: ${result}</h1>`);
})



const PORT = process.env.PORT;
const server = app.listen(PORT,()=>{
    console.log(`server running on ${server.address().port}`);
})