const spawn = require('child_process').spawn;

var stats = {};

function startSpeedBackground(){
  setInterval(function(){
    var startDate = new Date().getTime();

    const speed = spawn('speedtest-cli', ['--json']);

    var buffer = '';

    speed.stdout.on('data', (data) => {
      buffer += data;
    });

    speed.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    speed.on('close', (code) => {
      stats[startDate] = JSON.parse(buffer);
    });
  }, 20000);
}

function getRawStats(){
  return stats;
}

module.exports = {
  startSpeedBackground: startSpeedBackground,
  getRawStats: getRawStats
}
