const express = require('express')
const app = express()
const port = 6000
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

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))