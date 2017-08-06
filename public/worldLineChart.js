var WorldLineChart = function() {
  var container = document.querySelector('#line-chart');

  var url = 'http://api.worldbank.org/v2/countries/WLD/indicators/SP.POP.TOTL?date=1960:2016&format=json&per_page=60';

  makeRequest(url, function () {
    if (this.status !== 200) return; 
    var jsonString = this.responseText;
    var response = JSON.parse(jsonString);
    var world = response[1];
    // console.log(world);

    var population = [];
    for (var i = world.length - 1; i >= 0; --i) {
      population.push(world[i].value);
    };
    // console.log(population);

    var chart = new Highcharts.Chart(container, {
      title: {
        text: 'Population Total: World, 1960 to 2016'
      },

      subtitle: {
        text: 'Source: The World Bank'
      },

      yAxis: {
        title: {
          text: 'People'
        }

      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      plotOptions: {
        series: {
          pointStart: 1960
        }
      },

      series: [{
        name: 'Total Population',
        data: population
      }]
    });
  });
}