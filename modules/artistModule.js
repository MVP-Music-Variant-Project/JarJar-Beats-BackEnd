'use strict'

const Artist = {};
const ArtistModel = require('../models/artistModel');
const verifyUser = require('./auth');

Artist.getArtist = async (req, res, next) => {
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
        let results = await ArtistModel.find(params);
        res.status(200).send(results);
      } catch (err) {
        next(err);
      }
    }
  });
}

Artist.postArtist = async (req, res, next) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      console.log(req.body)
      try {
        let createdArtist = await ArtistModel.create(req.body);
        res.status(200).send(createdArtist);
      } catch (err) {
        next(err);
      }
    }
  });
}

Artist.deleteArtist = async (req, res, next) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      try {
        let id = req.params.id;
        await ArtistModel.findByIdAndDelete(id);
        res.status(200).send('Artist Deleted');
      } catch (err) {
        next(err);
      }
    }
  });
}

module.exports = Artist;
