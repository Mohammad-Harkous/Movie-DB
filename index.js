const express = require('express');

// express app
const app = express();

const time = new Date();

let hours = time.getHours();
let minutes = time.getMinutes();

let currentTime = `${hours}:${minutes}`



app.get('/', function(req, res){
    res.send('ok')
})

app.get('/test', function(req, res){
    res.status(200).send({status:200, message:"ok"})
})

app.get('/time', function(req, res){
    res.status(200).send({status:200, message: currentTime})
})

// list for requests
app.listen(3000);