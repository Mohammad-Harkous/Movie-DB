const express = require('express');
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

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


/* note : I comment out the rest of steps to work with Step 12: Data Persistence
app.post('/movies/add', (req, res) => {

})

app.get('/movies/get', (req, res) =>{
    res.status(200).send({status:200, data:movies })
})

app.put('/movies/edit', (req, res) =>{

})

app.delete('/movies/delete', (req, res) =>{

})
*/

/*
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


//Step 9 - DELETE
app.delete('/movies/delete/:id', (req, res) => {
    const id = req.params.id
    const found = movies.some(movie => movie.id === parseInt(id))

    if (found) {
      res.status(200).json({ message: 'movie was deleted', movies:movies.filter(movie => movie.id !== parseInt(id))})
    }else{
        res.status(404).json({status:404, error:true, message:'the movie of id ' + id + ' does not exist'})
    }
})

//Step 10 - UPDATE

app.put('/movies/update/:id', (req, res) => {
    const id = req.params.id
    const found = movies.some(movie => movie.id === parseInt(id))

    if (found) {
        const updateMovie = req.body
        movies.forEach(movie => {
            if(movie.id === parseInt(id)){
                movie.title = updateMovie.title ? updateMovie.title : updateMovie.title
                movie.year = updateMovie.year ? updateMovie.year : updateMovie.year
                movie.rating = updateMovie.rating ? updateMovie.rating : updateMovie.rating

                res.json({message: 'movie update', movie: movie})
            }
        })
    }else{
        res.status(404).json({status:404, error:true, message:'the movie of id ' + id + ' does not exist'})
    }
})

// Step 11 - Use HTTP Verbs

// get request for  moives by its date and ordered by date
app.get('/movies/read/by-date', (req, res) => {

    const date =   movies.sort(function(a,b){
        return new Date(b.year) - new Date(a.year);
      });
   
    res.status(200).send({status:200, data:date})
})

// get request for moives by its rating and ordered by rating
app.get('/movies/read/by-rating', (req, res) => {
    const rate =   movies.sort(function(a,b){
        return (b.rating) - (a.rating);
      });

    res.status(200).send({status:200, data: rate})
})

// get request for moives by its title and ordered by title
app.get('/movies/read/by-title', (req, res) => {
    const title = movies.sort(function(a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
    });

    res.status(200).send({status:200, data: title})
})

// get request search for a moive by its id
app.get('/movies/read/id/:id', (req,res) => {

    const id = req.params.id
    const found = movies.some(movie => movie.id === parseInt(id))

    if (found) {
      res.status(200).json(movies.filter(movie => movie.id === parseInt(id)))
    }else{
        res.status(404).json({status:404, error:true, message:'the movie of id ' + id + ' does not exist'})
    }
})

// post request for creating new movie
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


// delete request  for deleting a moive by its id
app.delete('/movies/delete/:id', (req, res) => {
    const id = req.params.id
    const found = movies.some(movie => movie.id === parseInt(id))

    if (found) {
      res.status(200).json({ message: 'movie was deleted', movies:movies.filter(movie => movie.id !== parseInt(id))})
    }else{
        res.status(404).json({status:404, error:true, message:'the movie of id ' + id + ' does not exist'})
    }
})

// update request for updating a moive by its id
app.put('/movies/update/:id', (req, res) => {
    const id = req.params.id
    const found = movies.some(movie => movie.id === parseInt(id))

    if (found) {
        const updateMovie = req.body
        movies.forEach(movie => {
            if(movie.id === parseInt(id)){
                movie.title = updateMovie.title ? updateMovie.title : updateMovie.title
                movie.year = updateMovie.year ? updateMovie.year : updateMovie.year
                movie.rating = updateMovie.rating ? updateMovie.rating : updateMovie.rating

                res.json({message: 'movie update', movie: movie})
            }
        })
    }else{
        res.status(404).json({status:404, error:true, message:'the movie of id ' + id + ' does not exist'})
    }
})
*/

// Step 12: Data Persistence
 
// db connection
let db

connectToDb((err) => {
    if(!err) {
    // listen for requests
    app.listen(3000); 

    db = getDb()
    }
})

// post request to add new movie
app.post('/movies/add', (req, res) => {
    const addMovie = req.body

        db.collection('movieDb')
        .insertOne(addMovie)
        .then(result => {
          res.status(201).json(result)
        })
        .catch(() => {
          res.status(500).json({err: 'Could not create a document'})
        })
   
})

// get request for geting all movies
app.get('/movies/get', (req, res) => {
    let movies = []

    db.collection('movieDb')
    .find()
    .sort({ title: 1}) 
    .forEach(movie => movies.push(movie))
    .then(() => {
        res.status(200).json(movies)
    })
    .catch(() => {
        res.status(500).json({err: 'Could not fetch the documents'})
    })
})

// get request to find a movie by its id
app.get('/movies/get/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('movieDb')
        .findOne({_id: ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the document'})
        })

    }else{
        res.status(500).json({error: 'Not a valid id'})
    }
})


// delete request for deleting a movie
app.delete('/movies/delete/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('movieDb')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not delete the document'})
        })

    }else{
        res.status(500).json({error: 'Not a valid id'})
    }
})

// update request to a update a data for existing movie
app.patch('/movies/update/:id', (req, res) => {
    const updateMovie = req.body

    if(ObjectId.isValid(req.params.id)) {
        db.collection('movieDb')
        .updateOne({_id: ObjectId(req.params.id)}, {$set: updateMovie} )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not update the document'})
        })

    }else{
        res.status(500).json({error: 'Not a valid id'})
    }
})





