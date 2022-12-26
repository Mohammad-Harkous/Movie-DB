const express = require('express');

// express app
const app = express();


app.get('/', function(req, res){
    res.send('ok')
})

// list for requests
app.listen(3000);