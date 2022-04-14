const request = require('request');

const fetchMyIP = function(callback) { //function of error and IP. Passes an error or IP string
  const URL = 'https://api.ipify.org?format=json';
  request(URL, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {  // if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    }
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

///

const fetchCoordsByIP = function(ip, callback) {
  const URL = `https://freegeoip.app/json/${ip}`;
  request(URL, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    let data = JSON.parse(body);   // OR can do - const { latitude, longitude } = JSON.parse(body);
    const latitude = data.latitude;
    const longitude = data.longitude;
    const coordinates = {latitude, longitude};

    callback(null, coordinates);

  });
};

///

const fetchISSFlyOverTimes = function(coords, callback) {
  const URL = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(URL, (error, response, body) => {
    if (error) {
      return callback(error,null);
    }

    if (response.statusCode !== 200) {
      return callback(Error((`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null));
    }

    const flyOvers = JSON.parse(body).response;
    callback(null, flyOvers);
  });
};

const nextISSTimesForMyLocation = function () {
  
}





module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};