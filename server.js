'use strict';

const express = require('express');
const app = express();

require('dotenv').config();
const Artist = require('./modules/artistModule');
const cors = require('cors');
const playlistModule = require('./modules/playlistModules');


const search = require('./modules/search');


//console.log(Artist);

app.use(cors());
app.use(express.json());

console.log(Artist.getArtist);

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3002;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

mongoose.connect(process.env.DB_URL);

app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});


// playlist routes
app.get('/playlist', playlistModule.getPlaylist);
app.post('/playlist', playlistModule.postPlaylist);
app.delete('/playlist/:id', playlistModule.deletePlaylist)
app.put('/playlist/:id', playlistModule.putPlaylist)


app.get('/searchConcerts', search.getConcerts);
app.get('/searchSongs', search.getSongs);

app.get('/artist', Artist.getArtist);
app.post('/artist', Artist.postArtist);
app.delete('/artist/:id', Artist.deleteArtist);


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
