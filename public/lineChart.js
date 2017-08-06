var LineChart = function(country) {

  var container = document.querySelector('#line-chart');
  var countryName = country.name;
  console.log(countryName);

  var url = 'http://api.worldbank.org/v2/countries/' + country.id + '/indicators/SP.POP.TOTL?date=1960:2016&format=json&per_page=60';
  makeRequest(url, function () {
    if (this.status !== 200) return; 
    var jsonString = this.responseText;
    var response = JSON.parse(jsonString);
    console.log(response[0]);
    var country = response[1];

    var population = [];
    for (var i = country.length - 1; i >= 0; --i) {
      population.push(country[i].value);
    };

  var chart = new Highcharts.Chart(container, {
    title: {
      text: 'Population Total: ' + countryName + ', 1960 to 2016'
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
      name: 'Population',
      data: population
    }]
  });
}); 
}