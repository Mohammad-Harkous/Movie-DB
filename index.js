const express = require('express');

// express app
const app = express();

const time = new Date();

let hours = time.getHours();
let minutes = time.getMinutes();

let currentTime = `${hours}:${minutes}`;



app.get('/', (req, res) => {
    res.send('ok')
})

app.get('/test', (req, res) => {
    res.status(200).send({status:200, message:"ok"})
})

app.get('/time', (req, res) => {
    res.status(200).send({status:200, message: currentTime})
})

app.get('/hello/:id', (req, res) => {
    const id = req.params.id
    res.status(200).send({status:200, message:`Hello, ${id}`})
})


app.get('/search', (req, res) => {
    const search = req.query
    res.status(200).send({status:200, message:"ok", data:search})       
})


 

// list for requests
app.listen(3000);