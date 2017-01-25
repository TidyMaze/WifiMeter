var express = require('express');
var router = express.Router();
var pingService = require('../services/pingService');
var speedService = require('../services/speedService');

router.get('/', function(req, res) {
  res.json(pingService.getRawStats());
});

router.get('/grouped', function(req, res) {
  res.json(pingService.getGroupedStats());
});

router.get('/speed', function(req, res) {
  res.json(speedService.getRawStats());
});

module.exports = router;
