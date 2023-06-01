// most of the handlers for git requests
// class constructor

'use strict'

const axios = require('axios')
let cache = require('./cache.js')
let search = {};



search.getConcerts = async (req, res, next) => {
  let artistName = req.query.name;
  console.log(artistName);
  // let address =
  // let dateStart = 
  // let dateEnd =
  const key = artistName;
  const url = `https://concerts-artists-events-tracker.p.rapidapi.com/artist?name=${artistName}&rapidapi-key=${process.env.CONCERT_API_KEY}`;
  console.log('this is the url: ', url);

  const tenDaysInMillis = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds

  try {
    if (cache[key] && (Date.now() - cache[key].timestamp < tenDaysInMillis)) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      let result = await axios.get(url);
      console.log('this is the result: ', result.data.data)
      cache[key].data = result.data.data.map(object => {
        return new Concert(object);
      });
    }
    res.status(200).send(cache[key].data);
  } catch (error) {
    next(error)
  }
};

search.getSongs = async (req, res, next) => {
  let artistLibrary = req.query.name;
  // console.log('this is the song name: ', songName);
  const key = artistLibrary;
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistLibrary}&rapidapi-key=${process.env.SONG_API_KEY}`;
  console.log('this is the song url: ', url);

  const tenDaysInMillis = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds

  try {
    if (cache[key] && (Date.now() - cache[key].timestamp < tenDaysInMillis)) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      let result = await axios.get(url);
      // console.log('this is the result: ', result.data.data)
      cache[key].data = result.data.data.map(object => {
        return new Playlist(object);
      });
    }
    res.status(200).send(cache[key].data);
  } catch (error) {
    next(error)
  }
};

class Concert {
  constructor(concert) {
    console.log('this is Concert Construct: ', concert)
    this.description = concert.description;
    this.location = concert.location.address.streetAddress;
  }
}
console.log('This is the Concert: ', Concert);

class Playlist {
  constructor(playlist) {
    console.log('this is Playlist Construct: ', playlist)
    this.title = playlist.title;
    this.album = playlist.album.title;
    this.image = playlist.album.cover_small;
  }
}


// https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}&rapidapi-key=SONG_API_KEY

module.exports = search