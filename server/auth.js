const axios = require('axios').default;
const moment = require('moment');
// import express from express;

const apiKey = 'ImYwyH0R4fDOqLrsecEz15zu4bMa';
const secretKey = 'RV8TO7qfYPWgEdSOMfL6_9bwAMQa';
const tokenUrl = 'https://api.vasttrafik.se/token';
const authType = 'client_credentials';
let _authToken;
let token_expire;

async function updateToken() {
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
        // kör await här, kör await där borde vara enough
        try {
            let res = await axios.post(tokenUrl, body, config);
            let addedTime = moment(moment.now()).add(res.data.expires_in);
            token_expire = addedTime;
            _authToken = res.data.access_token;
            return _authToken;
        } catch(err) {
            console.log(err.response.data);
        }
    }
}

module.exports.getAuthToken = async () => {
    await updateToken();
    return _authToken;
}