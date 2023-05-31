'use strict'
const playlistModule = {}; 

const PlaylistModel = require('../models/playlistModel');

// This exports multiple functions at once.
playlistModule.getPlaylist = async (req, res, next) => {
    try {
      // This talks to your database
    //   This is referencing your model
      let results = await PlaylistModel.find({});
      res.status(200).send(results);
    } catch (err) {
      next(err)
    }
  };
  
  playlistModule.postPlaylist = async (req, res, next) => {
    try {
      let createdPlaylist = await PlaylistModel.create(req.body);
      res.status(200).send(createdPlaylist);
    } catch (err) {
      next(err);
    }
  };
  
  playlistModule.deletePlaylist = async (req, res, next) => {
    try {
      let id = req.params.id;
    //   How are we specifying for individual songs? By ID?
      await PlaylistModel.findByIdAndDelete(id);
      res.status(200).send('Playlsit Deleted');
      await Playlist.findByIdAndDelete(id);
      res.status(200).send('Playlist Deleted');
    } catch (err) {
      next(err);
    }
  }

  playlistModule.putPlaylist = async (req, res, next) => {
    try {
      let id = req.params.id;
    //   How are we specifying for individual songs? By ID?
      await PlaylistModel.findByIdAndDelete(id);
      res.status(200).send('Playlist Deleted');
    } catch (err) {
      next(err);
    }
  }

module.exports = playlistModule;
