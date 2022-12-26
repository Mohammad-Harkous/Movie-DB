const express = require('express');

// express app
const app = express();

// list for requests
app.listen(3000);

app.get('/', function(req, res){
    res.send('ok')
})