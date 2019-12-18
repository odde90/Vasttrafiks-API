const axios = require('axios');
const auth = require('./auth');
const convert = require('xml-js');
// much better code structure nw with a router
let allStops = [];

module.exports = {
  getAllStops: async function getAllStops(req, res) {
    let token = await auth.getAuthToken();
    let data = await allStopsAxios(token);
    if (data === null) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  },
  getStationBetweenStops: async function(req, res) {
    // skicka in namn på start och stopp
    const arrivalStop = req.params.start;
    const departureStop = req.params.stop;
    let token = await auth.getAuthToken();
    if (allStops.length === 0) {
      allStops = await allStopsAxios(token);
    }
    // hitta id för departure stop
    const originId = getStopIdByName(arrivalStop, token);
    // hitta id för arrival stop
    const depatureId = getStopIdByName(departureStop, token); 
    // skicka ett request till västtrafik API för att få en trip
    if (originId === null || depatureId === null) {
      res.status(400).send('One of the stations was not a valid station');
    } else {
      let jDetailRef = await createTrip(originId, depatureId, token);
      if (jDetailRef.statuscode !== 200) {
        res.sendStatus(jDetailRef.statuscode);
      } else {
        // Nu få alla destinations genom att anropa journeyDetail
        let stops = await getStops(jDetailRef.data, token);
        if (stops.statuscode !== 200) {
          res.sendStatus(stops.statuscode);
        } else {
          res.send(stops.data);
        }
      }
    }
  }
}

async function allStopsAxios(token) {
  try { 
    let response = await axios.get('https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops', {
      headers: {
        'Authorization': 'Bearer  ' +  token,
        'Format': 'JSON'
      }
    });
    let jsonData = convert.xml2json(response.data, {compact: true, spaces: 4});
    let jsonObj = JSON.parse(jsonData);
    allStops = jsonObj.LocationList.StopLocation;
    return allStops;
  } catch (err) {
    console.log('Error while getting all stops', err);
    return null;
  }
}

function getStopIdByName(name) {
  let possibleStops = allStops.filter(stop => stop._attributes.name.indexOf(name) !== -1);
  if (possibleStops.length <= 0) {
    return null;
  }
  let attributes = possibleStops.map(stop => stop._attributes);
  let weights = attributes.map(elem => elem.weight);
  // sort by weight
  let sorted = weights.sort(function(a, b) {
    return b - a;
  });
  let mostRelevant = attributes.filter(elem => elem.weight === sorted[0]);
  return mostRelevant[0].id;
}

async function createTrip(originId, depatureId, token) {
  try { 
    let response = await axios.get('https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=' + originId + '&destId=' + depatureId, {
      headers: {
        'Authorization': 'Bearer  ' +  token,
        'Format': 'JSON'
      }
    });
    let res;
    let jsonData = convert.xml2json(response.data, {compact: true, spaces: 4});
    let jsonObj = JSON.parse(jsonData);
    let legs = jsonObj.TripList.Trip[1].Leg;
    for (let i = 0; i < legs.length; i++) {
      if (legs[i].JourneyDetailRef !== undefined) {
        res = legs[i].JourneyDetailRef._attributes.ref;
        break;
      }
    }
    // send data 
    if (res === '') {
      return {
        data: 'No data for this trip',
        statuscode: 400
      }
    } else {
      return {
        data: res,
        statuscode: 200
      }
    }
  } catch(err) {
    console.log('creattrip Error', err);
    return {
      data: err,
      statuscode: 500
    }
  }   
}

async function getStops(jDetailsRef, token) {
  try { 
    let response = await axios.get(decodeURIComponent(jDetailsRef), {
      headers: {
        'Authorization': 'Bearer  ' +  token
      }
    });
    
    let jsonData = convert.xml2json(response.data, {compact: true, spaces: 4});
    let jsonObj = JSON.parse(jsonData);
    return {
      data: jsonObj.JourneyDetail.Stop,
      statuscode: 200
    };
  } catch(err) {
    console.log('Getstops Error', err);
    return {
      data: '',
      statuscode: 500
    }
  }
}
