'use strict'

const express = require('express')
const cors = require ('cors')

app.use(cors());
app.use(express.json());

app.get('/playlist', getPlaylist);
app.post('/playlist', postPlaylist);
app.delete('/playlist/:id', deletePlaylist)

async function getPlaylist(req, res, next) {
    try {
      // This talks to your database
      let results = await Playlist.find({});
      res.status(200).send(results);
    } catch (err) {cd 
      next(err)
    }
  };
  
  async function postPlaylist(req, res, next) {
    try {
      let createdPlaylist = await Playlist.create(req.body);
      res.status(200).send(createdPlaylist);
    } catch (err) {
      next(err);
    }
  };
  
  async function deletePlaylist(req, res, next) {
    try {
      let id = req.params.id;
    //   How are we specifying for individual songs? By ID?
      await Playlist.findByIdAndDelete(id);
      res.status(200).send('Playlsit Deleted');
    } catch (err) {
      next(err);
    }
  }