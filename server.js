'use strict';

const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');
const playlistModule = require('./modules/playlistModules');


app.use(cors());
app.use(express.json());

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

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
