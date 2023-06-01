'use strict'

const mongoose = require('mongoose')

const { Schema } = mongoose;

const playlistSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    songs: {
        type: Array, 
        required: true
    },
});

// Now we create the model
const playlistModel = mongoose.model ('playlist', playlistSchema)

// To export the the file we add module???.exports and the name of the schema we are referencing. book, the name we gave our schema, then dig into bookschema to get the data.
module.exports = playlistModel;
