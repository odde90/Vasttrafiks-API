const express = require('express');
const apiController = require('./apiController');
const router = express.Router();

router.route('/allstops').get(apiController.getAllStops);
router.route('/getStations/:start/:stop').get(apiController.getStationBetweenStops);
module.exports = router;