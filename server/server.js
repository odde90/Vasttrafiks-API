const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');
const schedule = require('node-schedule');
const axios = require('axios');
const auth = require('./auth');
// Get all stations once every midnight
schedule.scheduleJob('0 0 * * *', () => { 

});

// function for writing all locations to location.json file
function updatejson(locationFetch) {
    let locations = JSON.stringify(locationFetch);
    fs.writeFileSync('location.json', locations);
}

// ska egentligen hämtas från api
app.get('/api/allStops', async (req, res) => {
  let token = await auth.getAuthToken();
  axios.get('https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops', {
    headers: {
      'Authorization': 'Bearer  ' +  token,
      'Format': 'JSON'
    }
  })
  .then(function(response){
    // handle response
    console.log(response);
    res.send(response.data);
  })
  .catch(function(error){
    console.log(error);
    res.sendStatus(400);
  })

});

app.use(express.static('../public'));

  app.listen(5000, function () {
    console.log('Node server is running at port 5000..');
});



