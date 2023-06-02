'use strict'
const playlistModule = {};

const PlaylistSuperModel = require('../models/playlistModel');

const verifyUser = require('./auth');

// This exports multiple functions at once.
playlistModule.getPlaylist = async (req, res, next) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      let params = {};
      if (req.query.email) {
        params.email = req.query.email
      }
      try {
        // This talks to your database
        // This is referencing your model
        let results = await PlaylistSuperModel.findOne(params);
        res.status(200).send(results);
      } catch (err) {
        next(err)
      }
    }
  });
};

playlistModule.postPlaylist = async (req, res, next) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      console.log('test', req.body);
      try {
        let createdPlaylist = await PlaylistSuperModel.create(req.body);
        res.status(200).send(createdPlaylist);
      } catch (err) {
        next(err);
      }
    }
  });
};

playlistModule.deletePlaylist = async (req, res, next) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      try {
        let id = req.params.id;
        await PlaylistSuperModel.findByIdAndDelete(id);
        res.status(200).send('Playlist Deleted');
      } catch (err) {
        next(err);
      }
    }
  });
}

playlistModule.putPlaylist = async (req, res, next) => {
  try {
    let id = req.params.id;
    let playlistFromReq = req.body;
    console.log('test', playlistFromReq);
    let options = {
      new: true,
      overwrite: true
    };
    await PlaylistSuperModel.findByIdAndUpdate(id, playlistFromReq, options);
    res.status(200).send('Playlist Updated');
  } catch (err) {
    next(err);
  }
}

module.exports = playlistModule;
