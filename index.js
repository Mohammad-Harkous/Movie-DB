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


const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

app.post('/movies/add', (req, res) => {

})

app.get('/movies/get', (req, res) =>{
    res.status(200).send({status:200, data:movies })
})

app.put('/movies/edit', (req, res) =>{

})

app.delete('/movies/delete', (req, res) =>{

})

// list for requests
app.listen(3000);