const axios = require('axios').default;
// import express from express;

const apiKey = 'ImYwyH0R4fDOqLrsecEz15zu4bMa';
const secretKey = 'RV8TO7qfYPWgEdSOMfL6_9bwAMQa';
const tokenUrl = 'https://api.vasttrafik.se/token';
const authType = 'client_credentials';

export function auth() {
    // här ge ut en accestoken
    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    
    let body = `client_id=${apiKey}&client_secret=${secretKey}&grant_type=${authType}`;
      
    axios.post(tokenUrl, body, config)
    .then((res) => {
        console.log(res.data.access_token);
        return data.data.access_token
    }). catch ((err) => {
        console.log(err.response.data);
    });
}