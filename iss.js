/**
 * // IP ADDY JSON https://api.ipify.org?format=json
 *
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
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

module.exports = { fetchMyIP };
