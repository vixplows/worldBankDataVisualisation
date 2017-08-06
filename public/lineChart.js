var LineChart = function(country) {

  var container = document.querySelector('#line-chart');

  var url = 'http://api.worldbank.org/v2/countries/' + country.id + '/indicators/SP.POP.TOTL?date=1960:2016&format=json&per_page=60';
  makeRequest(url, function () {
    if (this.status !== 200) return; 
    var jsonString = this.responseText;
    var response = JSON.parse(jsonString);
    var country = response[1];
    console.log(country);2016
   //returns 1960
   console.log(country[56].date);
   // returns population value for 1960
   console.log(country[56].value);

  //do url request for country population data working with country id from object country have access to here and id as exists in population data

  var chart = new Highcharts.Chart(container, {
    title: {
      text: 'Population Total: ' + country.name + ', 1960 to 2016'
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
      data: [country[56].value, country[55].value, country[54].value, country[53].value, country[52].value, country[51].value, country[50].value, country[49].value, country[48].value, country[47].value, country[46].value, country[45].value, country[44].value, country[43].value]
    }]
  });
 }); 
}