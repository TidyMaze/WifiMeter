var rp = require('request-promise');

const url = 'http://www.google.fr';

var stats = {};

function startPingBackground(){
  setInterval(function(){
    var startDate = new Date().getTime();
    rp(url)
      .then(result => stats[startDate] = true)
      .catch(err => stats[startDate] = false);
  }, 500);
}

function getRawStats(){
  return stats;
}

function getGroupedStats(){
  var counts = {};
  for(timestamp in stats){
    console.log(timestamp);
    var date = new Date(+timestamp);
    console.log(date);
    var clampDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()).getTime();
    if(!(clampDate in counts)){
      counts[clampDate] = {
        nbOK : 0,
        nbKO : 0
      };
    }
    counts[clampDate][stats[timestamp]?'nbOK':'nbKO']++;
  }
  return counts;
}

module.exports = {
  startPingBackground: startPingBackground,
  getRawStats: getRawStats,
  getGroupedStats: getGroupedStats
}
