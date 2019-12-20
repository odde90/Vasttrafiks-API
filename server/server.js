const express = require('express');
const app = express()
const path = require('path');
const fs = require('fs');
const schedule = require('node-schedule');
const routes = require('./routes');
const api = require('./apiController');

schedule.scheduleJob('0 0 * * *', async () => {  
  let json = await api.getAllStops();  
  updatejson(json);
});


// function for writing all locations to location.json file
function updatejson(locationFetch) {
  let locations = JSON.stringify(locationFetch);
  fs.writeFileSync('location.json', locations);
}

app.use('/api', routes);
app.use(express.static('../public'));

app.get('/init', async function(req, res, next) {
  let rawdata = fs.readFileSync('location.json');
  let json = JSON.parse(rawdata);
  res.json(json)
})
app.use(express.json({limit:'1mb'}));
app.post('/clientRequestStops', function(req, res) {
  console.log(req.body)
})

  app.listen(5000, function () {
    console.log('Node server is running at port 5000..');
});



