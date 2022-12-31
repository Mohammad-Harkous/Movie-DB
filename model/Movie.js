const mongoose =require('mongoose');

const moiveSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
})

const Movie = mongoose.model('movie', moiveSchema);

module.exports = Movie;