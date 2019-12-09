
const express = require('express')
const app = express()
const port = 6000
var path = require('path');
const fs = require('fs');
import schedule from 'node-schedule';
// Get all stations once every midnight
schedule.scheduleJob('0 0 * * *', () => { 

});

// function for writing all locations to location.json file
function updatejson(locationFetch) {
    let locations = JSON.stringify(locationFetch);
    fs.writeFileSync('location.json', locations);
}




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
  app.listen(5000, function () {
    console.log('Node server is running..');
});