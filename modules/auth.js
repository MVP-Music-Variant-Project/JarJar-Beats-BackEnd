'use strict';

const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');

// the jwksUri comesd from your Auth0 account page (the "key page"). Account Page -> advanced settings -> Endpoints -> 0auth -> JSON Web Key Set
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// we need to verfy that the user on our route is who they say
function verifyUser(req, errorFirstOrUserCallbackFunction) {
  try {
    // extract the token from the user's request
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction)
  } catch (error) {
    errorFirstOrUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;
