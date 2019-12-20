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
    }else {
      res.send(data)
      return data
    }
    
  },
  getStationBetweenStops: async function(req, res) {
    // skicka in namn på start och stopp
    let arrivalStop = req.params.start;
    let departureStop = req.params.stop;
    let arrivalIsTrue = req.params.isArrival
    let arrivalTime= req.params.time
    let arrivalDate = req.params.date
    // hämta auth token för anrop mot västtrafiks api 
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
      let jDetailRef = await createTrip(originId, depatureId, token, arrivalIsTrue, arrivalTime, arrivalDate);
      if (jDetailRef.statuscode !== 200) {
        res.sendStatus(jDetailRef.statuscode);
      } else {
        // Nu få alla destinations genom att anropa journeyDetail
        let stops = await getStops(jDetailRef.data, token);
        let stopsData = stops.data;
        // only get the stops between the start and stop station
        // start by checking for the ids in array
        let startIndex = stopsData.findIndex(elem => elem._attributes.id === originId);
        let endIndex = stopsData.findIndex(elem => elem._attributes.id === depatureId);
        // still not found? search for full name in array
        console.log(stopsData);
        if (startIndex === -1) {
          startIndex = stopsData.findIndex(elem => elem._attributes.name.indexOf(arrivalStop) !== -1);
        }
        if (endIndex === -1) {
          endIndex = stopsData.findIndex(elem => elem._attributes.name.indexOf(departureStop) !== -1);
        }
        // Centralstationen heter ibland Göteborg Central, Göteborg och ibland Centralstationen, Göteborg i västtrafiks api ab någon anledning, fixa så det stämmer överens
        if ((startIndex === -1) && (arrivalStop.toUpperCase().indexOf('CENTRALSTATIONEN') !== -1)) {
          arrivalStop = 'Göteborg Central, Göteborg';
          startIndex = stopsData.findIndex(elem => elem._attributes.name.indexOf(arrivalStop) !== -1);
        }
        if ((endIndex === -1) && (departureStop.toUpperCase().indexOf('CENTRALSTATIONEN') !== -1)) {
          departureStop = 'Göteborg Central, Göteborg';
          endIndex = stopsData.findIndex(elem => elem._attributes.name.indexOf(departureStop) !== -1);
        }
        // still not found? send error message, couldnt find id
        if (startIndex === -1) {
          res.status(404).send('Could not find arrival station in the result from JourneyDetail');
        }
        else if (endIndex === -1) {
          res.status(404).send('Could not find departure station in the result from JourneyDetail');
        } else { // all stations found, send data
          let stopsRes = stopsData.slice(startIndex, endIndex+1);
          console.log(originId);
          console.log(depatureId);
          // send stops
          if (stops.statuscode !== 200) {
            res.sendStatus(stops.statuscode);
          } else {
            res.send(stopsRes);
          }
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

async function createTrip(originId, depatureId, token, arrivalIsTrue, arrivalTime, arrivalDate) {
  let response;

  if(arrivalIsTrue == 'arrival'){
     response = await axios.get('https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=' + originId + '&destId=' + depatureId + '&date='+arrivalDate +'&time='+arrivalTime+'&searchForArrival=1' , {
      headers: {
        'Authorization': 'Bearer  ' +  token,
        'Format': 'JSON'
      }
    });
  }else{
     response = await axios.get('https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=' + originId + '&destId=' + depatureId  + '&date='+arrivalDate +'&time='+arrivalTime , {
      headers: {
        'Authorization': 'Bearer  ' +  token,
        'Format': 'JSON'
      }
    });
  }

  try { 
  
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
