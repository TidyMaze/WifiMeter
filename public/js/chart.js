google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var options = {
    title: 'Wifi availability',
    curveType: 'function',
    legend: { position: 'bottom' },
    height: 500,
    series: {
      0: {targetAxisIndex: 0},
      1: {targetAxisIndex: 0},
      2: {targetAxisIndex: 1}
    },
    vAxes: {
      0: {title: 'Speed'},
      1: {title: 'Time'}
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart'));

  /*
  setInterval(function(){
    $.get("/stats/grouped", function( result ) {
      var data = google.visualization.arrayToDataTable([
        [{label:'Date', type:'date'},
        {label:'Availability', type:'number'}]
      ]);
      for(date in result){
        data.addRow([new Date(+date), result[date].nbOK/(result[date].nbOK + result[date].nbKO)]);
      }
      chart.draw(data, options);
    });
  }, 1000);
  */

  setInterval(function(){
    $.get("/stats/speed", function( result ) {
      console.log(result);
      var data = google.visualization.arrayToDataTable([
        [{label:'Date', type:'date'},
        {label:'Download', type:'number'},
        {label:'Upload', type:'number'},
        {label:'Ping', type:'number'}]
      ]);
      for(date in result){
        data.addRow([new Date(+date), result[date].download/1000000, result[date].upload/1000000, result[date].server.latency]);
      }
      chart.draw(data, options);
    });
  }, 1000);

}
