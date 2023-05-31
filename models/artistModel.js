'use strict'

const mongoose = require('mongoose');

const { Schema } = mongoose;

const artistSchema = new Schema({
  email: { type: String, require: true },
  name: { type: String, require: true }
});

const ArtistModel = mongoose.model('Artist', artistSchema);



module.exports = ArtistModel;
