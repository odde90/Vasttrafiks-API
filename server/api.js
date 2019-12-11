var app = require('express')();
var http = require('http').createServer(app);
var axios = require('axios');

/* all api calls goes here */

http.listen(8000, function(){
    console.log('listening on *:8000');
});