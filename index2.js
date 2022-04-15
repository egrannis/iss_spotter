const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printFlyOverTimes } = require('./index.js');

nextISSTimesForMyLocation()
  .then((flyOverTimes) => { // flyOverTimes is the output from nextISSTimesForMyLocation!
    printFlyOverTimes(flyOverTimes);
  })
  .catch((error) => {
    console.log("IT didn't work: ", error.message);
  });

// fetchMyIP()// this is encompassed by nextISSTimesForMyLocation()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body))

