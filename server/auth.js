const axios = require('axios').default;
const moment = require('moment');
// import express from express;

const apiKey = 'ImYwyH0R4fDOqLrsecEz15zu4bMa';
const secretKey = 'RV8TO7qfYPWgEdSOMfL6_9bwAMQa';
const tokenUrl = 'https://api.vasttrafik.se/token';
const authType = 'client_credentials';
let token_expire;

function auth() {
    // här ge ut en accestoken
    if (token_expire === undefined) {
        token_expire = moment.now();
    }
    let expirationDate = moment(token_expire);
    let currentTime = moment(moment.now());
    let diff = currentTime.diff(expirationDate);
    if (diff < 3600) {
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        
        let body = `client_id=${apiKey}&client_secret=${secretKey}&grant_type=${authType}`;
        
        axios.post(tokenUrl, body, config)
        .then((res) => {
            let addedTime = moment(moment.now()).add(res.data.expires_in);
            token_expire = addedTime;
            return res.data.access_token
        }). catch ((err) => {
            console.log(err.response.data);
        });
    }
}

auth();