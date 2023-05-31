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

  const fiveDaysInMillis = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
  if (cache[key] && (Date.now() - cache[key].timestamp < fiveDaysInMillis)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    let result = await axios.get(url);
    console.log('this is the result: ', result.data.data)

    try {
      cache[key].data = result.data.data;
      let concertData = cache[key].data;
      let dataToSend = concertData.map(object => {
        // return new Weather(object);
        console.log('this is object: ', object)
        return object;
      });
      res.status(200).send(dataToSend);
    } catch (error) {
      next(error)
    }
  }
};

module.exports = search