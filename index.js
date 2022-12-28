const express = require('express');

// express app
const app = express();

// Middleware
app.use(express.json());

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


// Step 5 - Set up the basis for CRUD
const movies = [
    { id:1, title: 'Jaws', year: 1975, rating: 8 },
    { id:2, title: 'Avatar', year: 2009, rating: 7.8 },
    { id:3, title: 'Brazil', year: 1985, rating: 8 },
    { id:4, title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
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


// step 6 - SEARCH
app.get('/movies/read/by-date', (req, res) => {

    const date =   movies.sort(function(a,b){
        return new Date(b.year) - new Date(a.year);
      });
   
    res.status(200).send({status:200, data:date})
})

app.get('/movies/read/by-rating', (req, res) => {
    const rate =   movies.sort(function(a,b){
        return (b.rating) - (a.rating);
      });

    res.status(200).send({status:200, data: rate})
})

app.get('/movies/read/by-title', (req, res) => {
    const title = movies.sort(function(a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
    });

    res.status(200).send({status:200, data: title})
})


// Step 7 - READ ONE
app.get('/movies/read/id/:id', (req,res) => {

    const id = req.params.id
    const found = movies.some(movie => movie.id === parseInt(id))

    if (found) {
      res.status(200).json(movies.filter(movie => movie.id === parseInt(id)))
    }else{
        res.status(404).json({status:404, error:true, message:'the movie of id ' + id + ' does not exist'})
    }
   
})

// Step 8 - CREATE
app.post('/movies/create', (req, res) => {
 const addMovie = {
    id: req.body.id,
    title: req.body.title,
    year: req.body.year,
    rating:req.body.rating
 }

 if(!addMovie.id || !addMovie.title || !addMovie.year || !Number.isInteger(addMovie.year) || addMovie.year <= 4 ) {
    return res.status(403).send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
 }else if(addMovie.rating == null){
    addMovie.rating = 4
 }

 movies.push(addMovie)

 res.send("movie added successfully")
})

// list for requests
app.listen(3000);