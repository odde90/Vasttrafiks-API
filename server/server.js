const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');
const schedule = require('node-schedule');
const routes = require('./routes');

// Get all stations once every midnight
schedule.scheduleJob('0 0 * * *', () => { 

});

// function for writing all locations to location.json file
function updatejson(locationFetch) {
    let locations = JSON.stringify(locationFetch);
    fs.writeFileSync('location.json', locations);
}

app.use('/api', routes);
app.use(express.static('../public'));

  app.listen(5000, function () {
    console.log('Node server is running at port 5000..');
});



