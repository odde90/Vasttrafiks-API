
var express = require('express');
var app = express();
var path = require('path');


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
  app.listen(5000, function () {
    console.log('Node server is running..');
});

