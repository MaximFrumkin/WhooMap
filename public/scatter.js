var Ozone = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    name: 'Ozone',
    marker: { size: 12 }
  };
  
  var Methane = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 10],
    mode: 'markers',
    name: 'Methane',
    marker: { size: 12 }
  };
  
  var CarbonDioxide = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'markers',
    name: 'Carbon Dioxide',
    marker: { size: 12 }
  };
  
  var data = [ Ozone, Methane, CarbonDioxide ];
  var lat = 0;
  var lan = 0;
  var oneyear = 0;

  const notify = (latlan,year) =>{
    lat = latlan.lat;
    lan = latlan.lng;
    oneyear =  year;
    console.log("From notify: "+ lat);
    console.log("From notify: "+ lan);
    console.log("From notify: "+ oneyear);
 
    
  };
 
  var layout = {
    title: {
      text:'Concentration vs Altitude, Year: XXXX, Latitude: XXXX, Longitude: XXXX',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Altitude (units)',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis: {
      title: {
        text: 'Concentration (units)',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };




  
  Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});